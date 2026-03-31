/**
 * AJITH STUDIO - GLOBAL CONFIGURATION AND TIMER SETTINGS
 * 
 * Edit this file to change Festival dates, Offer text, or Badges styling worldwide.
 */

window.AppConfig = {
    // 1. FESTIVAL DATABASE (Edit whenever you want!)
    Festivals: [
        { name: "Easter",             start: { month: 4, date: 5, hour: 0, min: 0 }, end: { month: 4, date: 12, hour: 23, min: 59 }, label: "Special <span class='free-blink'>Offer</span>" },
        { name: "Tamil New Year",     start: { month: 4, date: 7, hour: 0, min: 0 },    end: { month: 4, date: 15, hour: 23, min: 59 }, label: "புத்தாண்டு & விஷு <span class='free-blink'>Mega Offer</span>" },
        { name: "Workers Day",        start: { month: 4, date: 24, hour: 0, min: 0 },   end: { month: 5, date: 1, hour: 23, min: 59 },  label: "May Day Special <span class='free-blink'>Offer</span>" },
        { name: "Independence Day",   start: { month: 8, date: 8, hour: 0, min: 0 },    end: { month: 8, date: 15, hour: 23, min: 59 }, label: "Independence Day <span class='free-blink'>Offer</span>" },
        { name: "Onam",               start: { month: 8, date: 19, hour: 0, min: 0 },   end: { month: 8, date: 27, hour: 23, min: 59 }, label: "Onam Special <span class='free-blink'>Offer</span>" },
        { name: "Vinayagar Chaturthi",start: { month: 9, date: 7, hour: 0, min: 0 },    end: { month: 9, date: 14, hour: 23, min: 59 }, label: "விநாயகர் சதுர்த்தி <span class='free-blink'>Offer</span>" },
        { name: "Ayudha Puja",        start: { month: 10, date: 12, hour: 0, min: 0 },  end: { month: 10, date: 21, hour: 23, min: 59 },label: "ஆயுத பூஜை <span class='free-blink'>Special Sale</span>" },
        { name: "Deepavali",          start: { month: 11, date: 1, hour: 0, min: 0 },   end: { month: 11, date: 9, hour: 23, min: 59 }, label: "தீபாவளி <span class='free-blink'>Mega Dhamaka</span>" },
        { name: "Christmas",          start: { month: 12, date: 18, hour: 0, min: 0 },  end: { month: 12, date: 26, hour: 23, min: 59 },label: "Christmas <span class='free-blink'>Special Offer</span>" },
        { name: "New Year",           start: { month: 12, date: 27, hour: 0, min: 0 },  end: { month: 1, date: 2, hour: 23, min: 59 },  label: "New Year 2027 <span class='free-blink'>Offer</span>" }
    ],

    // 2. TIMING & BADGES SETTINGS
    Timer: {
        daysAdvanceForUpcoming: 7,  // Show "Offer Starts In" exactly 7 days before
    },
    Badges: {
        OfferBg: "bg-offer",        // Background class for active festival 
        NormalBg: "bg-best",        // Background class for normal days
        OfferText: "Offer",
        NormalText: "Best Price",
        PosterNormalText: "Trending", // Specifically for Poster Design
    }
};

/**
 * Server Time Synchronisation
 * Offsets the local system clock by fetching a trusted WorldTime API point,
 * preventing users from manipulating their desktop/mobile time to trigger offers.
 */
let _timeOffsetMs = 0;
let _timeSynced = false;

window.syncServerTime = async function() {
    if (_timeSynced) return;
    try {
        const t1 = Date.now();
        const res = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
        const data = await res.json();
        const t2 = Date.now();
        const serverTime = new Date(data.datetime).getTime();
        const roundTripDelay = (t2 - t1) / 2;
        
        // Offset = (ServerTime + delay) - LocalTime
        _timeOffsetMs = (serverTime + roundTripDelay) - t2;
        _timeSynced = true;
    } catch (e) {
        console.warn("Time Sync failed. Falling back to local clock.");
        _timeOffsetMs = 0; // Fallback to raw local time
    }
};

window.getRealIST = function() {
    return new Date(Date.now() + _timeOffsetMs);
};

// Initiate sync instantly as this script loads
window.syncServerTime();

/**
 * Global Festival State Engine
 * @returns { 
 *   isFestMode: boolean,       // Is ANY offer currently active?
 *   type: "Upcoming"|"Active", // Type of the timer needed
 *   targetTime: Date,          // The count-down target Date object 
 *   festName: string,          // The name of the matching festival 
 *   labelHTML: string          // The HTML for the label 
 * } | null
 */
window.getFestivalState = function() {
    const now = window.getRealIST();
    const year = now.getFullYear();
    let state = null; // Stays null if neither upcoming nor active
    
    // Process all festivals to find the nearest matching one (Active > Upcoming)
    for (let f of AppConfig.Festivals) {
        let s = new Date(year, f.start.month - 1, f.start.date, f.start.hour, f.start.min);
        let e = new Date(year, f.end.month - 1, f.end.date, f.end.hour, f.end.min);
        
        // Handle year wrap for Dec/Jan overlap
        if (f.end.month < f.start.month) {
            e.setFullYear(year + 1);
            if (now.getMonth() === 0 && f.start.month === 12) {
                // If we are currently in Jan, the start date was last year
                s.setFullYear(year - 1);
            }
        }
        
        const upcomingWindowMs = AppConfig.Timer.daysAdvanceForUpcoming * 86400000;
        const upcomingStartTime = new Date(s.getTime() - upcomingWindowMs);

        // Check if currently ACTIVE
        if (now >= s && now <= e) {
            state = { isFestMode: true, type: "Active", targetTime: e, festName: f.name, labelHTML: f.label };
            break; // Active always wins, break search
        }
        
        // Check if currently UPCOMING (Within 7 days before start)
        if (now >= upcomingStartTime && now < s) {
            // Keep looking for an active one, but store upcoming tentatively
            if (!state || state.type !== "Active") {
                state = { isFestMode: false, type: "Upcoming", targetTime: s, festName: f.name, labelHTML: `${f.name} Offer` };
            }
        }
    }
    
    return state;
};

// Global format helper for timers
window.formatTimerDiff = function(diffMs) {
    if (diffMs <= 0) return "00d 00h 00m 00s";
    const d = Math.floor(diffMs / 864e5), 
          h = Math.floor(diffMs % 864e5 / 36e5), 
          m = Math.floor(diffMs % 36e5 / 6e4), 
          s = Math.floor(diffMs % 6e4 / 1e3);
    
    return `${d<10?'0':''}${d}d ${h<10?'0':''}${h}h ${m<10?'0':''}${m}m ${s<10?'0':''}${s}s`;
};

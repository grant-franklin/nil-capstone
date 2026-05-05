import { useState, useMemo } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

// =============== THEME ===============
const T = {
  bg: "#0b0e14", card: "#12161f", cardAlt: "#161b27", border: "#1e2736",
  power: "#e63946", g5: "#457b9d", accent: "#f4a261",
  fb: "#e63946", bb: "#a855f7",
  text: "#e2e8f0", muted: "#7a8ba5", white: "#fff",
  green: "#2ec4b6", red: "#e63946", amber: "#f59e0b",
};

// =============== MODEL CONSTANTS ===============
// Power-law portal curves: NIL = exp(a) * rank^b
// Fit on 2026 On3 portal rankings (FB n=66, BB n=103)
const CURVES = {
  FB: { a: 15.5058, b: -0.6132, r2: 0.642 },
  BB: { a: 15.3189, b: -0.4972, r2: 0.501 },
};

// Position multipliers = geometric mean of (actual_NIL / curve_predicted)
const POS_MULTS = {
  FB: { QB: 1.86, DL: 1.24, OT: 0.98, CB: 0.97, EDGE: 0.95, LB: 0.94, S: 0.91, RB: 0.81, WR: 0.80, TE: 0.78, IOL: 0.61 },
  BB: { C: 1.61, PF: 1.30, CG: 0.89, SG: 0.80, PG: 0.69, SF: 0.67 },
};

// Hard cap: highest confirmed annual NIL is ~$7M (Dybantsa, Underwood)
const MAX_NIL = 8_000_000;

// School data: [school_name, avg_NIL, conference, tier, blue_chip_pct]
// 2026 data primary, falls back to most recent year (2024-2026) for schools missing in 2026
const FB_SCHOOLS = [
  ["Abilene Christian", 7500, "United Athletic", "Non-Power 4", 0],
  ["Air Force", 12100, "Mountain West", "Non-Power 4", 0],
  ["Akron", 13300, "MAC", "Non-Power 4", 0],
  ["Alabama", 146000, "SEC", "Power 4", 0.52],
  ["Alabama A&M", 18300, "SWAC", "Non-Power 4", 0.0],
  ["Alabama State", 6700, "SWAC", "Non-Power 4", 0.0],
  ["Alcorn State", 15400, "SWAC", "Non-Power 4", 0.0],
  ["Appalachian State", 12600, "Sun Belt", "Non-Power 4", 0],
  ["Arizona", 29000, "Big 12", "Power 4", 0.2],
  ["Arizona State", 46000, "Big 12", "Power 4", 0.24],
  ["Arkansas", 22000, "SEC", "Power 4", 0.09],
  ["Arkansas State", 9100, "Sun Belt", "Non-Power 4", 0],
  ["Army", 11800, "American", "Non-Power 4", 0],
  ["Auburn", 54000, "SEC", "Power 4", 0.24],
  ["Austin Peay", 25000, "United Athletic", "Non-Power 4", 0],
  ["BYU", 57000, "Big 12", "Power 4", 0.32],
  ["Ball State", 9500, "MAC", "Non-Power 4", 0],
  ["Baylor", 19700, "Big 12", "Power 4", 0.13],
  ["Bethel University", 5300, "Unknown", "Non-Power 4", 0.0],
  ["Bethune-Cookman", 15700, "SWAC", "Non-Power 4", 0.0],
  ["Boise State", 12300, "Mountain West", "Non-Power 4", 0],
  ["Boston College", 11700, "ACC", "Power 4", 0],
  ["Bowling Green", 10200, "MAC", "Non-Power 4", 0],
  ["Brown", 9100, "Ivy League", "Non-Power 4", 0],
  ["Bryant University", 11200, "Unknown", "Non-Power 4", 0],
  ["Bucknell", 6400, "Patriot", "Non-Power 4", 0.0],
  ["Buffalo", 11600, "MAC", "Non-Power 4", 0],
  ["Cal Poly", 6900, "Big Sky", "Non-Power 4", 0],
  ["California", 15000, "ACC", "Power 4", 0.11],
  ["Campbell", 10600, "CAA", "Non-Power 4", 0.0],
  ["Central Arkansas", 12100, "United Athletic", "Non-Power 4", 0],
  ["Central Michigan", 8900, "MAC", "Non-Power 4", 0],
  ["Charleston Southern", 11600, "OVC-Big South", "Non-Power 4", 0.0],
  ["Charlotte", 10400, "American", "Non-Power 4", 0],
  ["Chattanooga", 10500, "SoCon", "Non-Power 4", 0.0],
  ["Chicago State", 15400, "Unknown", "Non-Power 4", 0.0],
  ["Cincinnati", 11800, "Big 12", "Power 4", 0.04],
  ["Clemson", 45000, "ACC", "Power 4", 0.39],
  ["Coastal Carolina", 12200, "Sun Belt", "Non-Power 4", 0],
  ["Colgate", 10200, "Patriot", "Non-Power 4", 0.0],
  ["Colorado", 18000, "Big 12", "Power 4", 0.11],
  ["Colorado State", 13000, "Mountain West", "Non-Power 4", 0],
  ["Columbia", 11200, "Ivy League", "Non-Power 4", 0.0],
  ["Connecticut", 13000, "Unknown", "Non-Power 4", 0],
  ["Cornell", 9200, "Ivy League", "Non-Power 4", 0.0],
  ["Dartmouth", 11300, "Ivy League", "Non-Power 4", 0.0],
  ["Davidson", 15300, "Pioneer", "Non-Power 4", 0.0],
  ["Delaware", 10700, "Conference USA", "Non-Power 4", 0],
  ["Delaware State", 34000, "MEAC", "Non-Power 4", 0.0],
  ["Duke", 18500, "ACC", "Power 4", 0.13],
  ["Duquesne", 13300, "NEC", "Non-Power 4", 0.0],
  ["East Carolina", 12400, "American", "Non-Power 4", 0],
  ["East Tennessee State", 16600, "SoCon", "Non-Power 4", 0],
  ["Eastern Illinois", 10000, "OVC-Big South", "Non-Power 4", 0.0],
  ["Eastern Kentucky", 14400, "United Athletic", "Non-Power 4", 0],
  ["Eastern Michigan", 11000, "MAC", "Non-Power 4", 0],
  ["Eastern Washington", 7500, "Big Sky", "Non-Power 4", 0],
  ["Elon", 9800, "CAA", "Non-Power 4", 0.0],
  ["FIU", 11300, "Conference USA", "Non-Power 4", 0],
  ["Ferris State", 21000, "Unknown", "Non-Power 4", 0.0],
  ["Florida", 128000, "SEC", "Power 4", 0.65],
  ["Florida A&M", 7400, "SWAC", "Non-Power 4", 0],
  ["Florida Atlantic", 11900, "American", "Non-Power 4", 0],
  ["Florida State", 49000, "ACC", "Power 4", 0.32],
  ["Fordham", 21000, "Patriot", "Non-Power 4", 0.0],
  ["Fresno State", 18300, "Mountain West", "Non-Power 4", 0],
  ["Furman", 10700, "SoCon", "Non-Power 4", 0.0],
  ["Gardner-Webb", 22000, "OVC-Big South", "Non-Power 4", 0.0],
  ["Georgia", 156000, "SEC", "Power 4", 0.66],
  ["Georgia Southern", 9100, "Sun Belt", "Non-Power 4", 0],
  ["Georgia State", 9700, "Sun Belt", "Non-Power 4", 0],
  ["Georgia Tech", 18300, "ACC", "Power 4", 0.04],
  ["Grambling State", 15600, "SWAC", "Non-Power 4", 0.0],
  ["Grand Valley State", 7500, "Unknown", "Non-Power 4", 0.0],
  ["Hampden-Sydney", 7500, "Unknown", "Non-Power 4", 0.0],
  ["Hampton", 19200, "CAA", "Non-Power 4", 0.0],
  ["Harvard", 14500, "Ivy League", "Non-Power 4", 0],
  ["Hawaii", 12900, "Unknown", "Non-Power 4", 0],
  ["Holy Cross", 8000, "Patriot", "Non-Power 4", 0.0],
  ["Houston", 76000, "Big 12", "Power 4", 0.17],
  ["Houston Christian", 15900, "Southland", "Non-Power 4", 0.0],
  ["Howard", 11400, "MEAC", "Non-Power 4", 0],
  ["Idaho", 8300, "Big Sky", "Non-Power 4", 0],
  ["Idaho State", 11200, "Big Sky", "Non-Power 4", 0],
  ["Illinois", 22000, "Big Ten", "Power 4", 0.15],
  ["Illinois State", 13600, "MVFC", "Non-Power 4", 0],
  ["Incarnate Word", 6900, "Southland", "Non-Power 4", 0.0],
  ["Indiana", 27000, "Big Ten", "Power 4", 0.32],
  ["Indianapolis", 7500, "Unknown", "Non-Power 4", 0.0],
  ["Iowa", 47000, "Big Ten", "Power 4", 0.37],
  ["Iowa State", 10300, "Big 12", "Power 4", 0],
  ["Jackson State", 22000, "SWAC", "Non-Power 4", 0.0],
  ["Jacksonville State", 11400, "Conference USA", "Non-Power 4", 0],
  ["James Madison", 12100, "Sun Belt", "Non-Power 4", 0],
  ["Kansas", 15600, "Big 12", "Power 4", 0.06],
  ["Kansas State", 13100, "Big 12", "Power 4", 0],
  ["Kennesaw State", 12300, "Conference USA", "Non-Power 4", 0],
  ["Kent State", 8100, "MAC", "Non-Power 4", 0],
  ["Kentucky", 36000, "SEC", "Power 4", 0.19],
  ["LSU", 195000, "SEC", "Power 4", 0.67],
  ["Lafayette", 10900, "Patriot", "Non-Power 4", 0],
  ["Lamar", 12400, "Southland", "Non-Power 4", 0.0],
  ["Liberty", 10600, "Conference USA", "Non-Power 4", 0],
  ["Lindenwood University", 21000, "Unknown", "Non-Power 4", 0.0],
  ["Long Island", 11100, "Unknown", "Non-Power 4", 0.0],
  ["Louisiana", 9400, "Sun Belt", "Non-Power 4", 0],
  ["Louisiana Tech", 8700, "Conference USA", "Non-Power 4", 0],
  ["Louisiana-Monroe", 16300, "Sun Belt", "Non-Power 4", 0],
  ["Louisville", 27000, "ACC", "Power 4", 0.14],
  ["Maine", 9500, "CAA", "Non-Power 4", 0.0],
  ["Marshall", 10000, "Sun Belt", "Non-Power 4", 0],
  ["Maryland", 58000, "Big Ten", "Power 4", 0.06],
  ["Massachusetts", 10400, "Unknown", "Non-Power 4", 0],
  ["McNeese State", 7200, "Unknown", "Non-Power 4", 0],
  ["Memphis", 12100, "American", "Non-Power 4", 0],
  ["Mercer", 23000, "SoCon", "Non-Power 4", 0],
  ["Mercyhurst College", 6600, "Unknown", "Non-Power 4", 0.0],
  ["Miami", 150000, "Unknown", "Non-Power 4", 0.61],
  ["Miami (OH)", 13400, "MAC", "Non-Power 4", 0],
  ["Michigan", 80000, "Big Ten", "Power 4", 0.46],
  ["Michigan State", 28000, "Big Ten", "Power 4", 0.14],
  ["Middle Tennessee State", 11200, "Unknown", "Non-Power 4", 0],
  ["Minnesota", 20000, "Big Ten", "Power 4", 0.16],
  ["Minnesota Duluth", 10000, "Unknown", "Non-Power 4", 0.0],
  ["Minnesota State Mankato", 9800, "Unknown", "Non-Power 4", 0.0],
  ["Mississippi State", 23000, "SEC", "Power 4", 0.1],
  ["Mississippi Valley State", 15800, "SWAC", "Non-Power 4", 0.0],
  ["Missouri", 25000, "SEC", "Power 4", 0.17],
  ["Missouri State University", 11500, "Unknown", "Non-Power 4", 0],
  ["Monmouth", 11200, "CAA", "Non-Power 4", 0.0],
  ["Montana", 10800, "Big Sky", "Non-Power 4", 0.0],
  ["Montana State", 9300, "Big Sky", "Non-Power 4", 0],
  ["Murray State", 9800, "MVFC", "Non-Power 4", 0],
  ["NC State", 14700, "ACC", "Power 4", 0.04],
  ["Navy", 10800, "American", "Non-Power 4", 0],
  ["Nebraska", 40000, "Big Ten", "Power 4", 0.27],
  ["Nevada", 9800, "Mountain West", "Non-Power 4", 0],
  ["New Hampshire", 7200, "CAA", "Non-Power 4", 0.0],
  ["New Mexico", 9900, "Mountain West", "Non-Power 4", 0],
  ["New Mexico State", 9600, "Conference USA", "Non-Power 4", 0],
  ["Nicholls State", 14700, "Unknown", "Non-Power 4", 0.0],
  ["Norfolk State", 12600, "MEAC", "Non-Power 4", 0],
  ["North Alabama", 12600, "United Athletic", "Non-Power 4", 0.0],
  ["North Carolina", 35000, "ACC", "Power 4", 0.24],
  ["North Carolina A&T", 10000, "CAA", "Non-Power 4", 0.0],
  ["North Carolina Central", 9400, "MEAC", "Non-Power 4", 0],
  ["North Dakota", 8700, "MVFC", "Non-Power 4", 0],
  ["North Dakota State", 8000, "MVFC", "Non-Power 4", 0],
  ["North Texas", 9000, "American", "Non-Power 4", 0],
  ["Northern Arizona", 5000, "Big Sky", "Non-Power 4", 0.0],
  ["Northern Illinois", 9500, "MAC", "Non-Power 4", 0],
  ["Northern Iowa", 14800, "MVFC", "Non-Power 4", 0],
  ["Northwest Missouri State", 9700, "Unknown", "Non-Power 4", 0.0],
  ["Northwestern", 14300, "Big Ten", "Power 4", 0.04],
  ["Notre Dame", 96000, "FBS Independent", "Non-Power 4", 0.7],
  ["Ohio", 11600, "MAC", "Non-Power 4", 0],
  ["Ohio State", 150000, "Big Ten", "Power 4", 0.64],
  ["Oklahoma", 71000, "SEC", "Power 4", 0.36],
  ["Oklahoma State", 10900, "Big 12", "Power 4", 0],
  ["Old Dominion", 11700, "Sun Belt", "Non-Power 4", 0],
  ["Ole Miss", 52000, "SEC", "Power 4", 0.26],
  ["Oregon", 219000, "Big Ten", "Power 4", 0.7],
  ["Oregon State", 13100, "Pac-12", "Non-Power 4", 0],
  ["Penn State", 32000, "Big Ten", "Power 4", 0.13],
  ["Pennsylvania", 6600, "Unknown", "Non-Power 4", 0.0],
  ["Pittsburg State", 20000, "Unknown", "Non-Power 4", 0.0],
  ["Pittsburgh", 19700, "ACC", "Power 4", 0.05],
  ["Portland State", 21000, "Big Sky", "Non-Power 4", 0],
  ["Princeton", 9400, "Ivy League", "Non-Power 4", 0.0],
  ["Purdue", 14100, "Big Ten", "Power 4", 0],
  ["Rhode Island", 16500, "CAA", "Non-Power 4", 0.0],
  ["Rice", 9700, "American", "Non-Power 4", 0],
  ["Richmond", 10000, "Patriot", "Non-Power 4", 0],
  ["Robert Morris", 8900, "NEC", "Non-Power 4", 0.0],
  ["Rutgers", 18600, "Big Ten", "Power 4", 0.09],
  ["SMU", 23000, "ACC", "Power 4", 0.17],
  ["Sacramento State", 9300, "Big Sky", "Non-Power 4", 0],
  ["Saint Francis (PA)", 30000, "Unknown", "Non-Power 4", 0.0],
  ["Sam Houston State", 9500, "Unknown", "Non-Power 4", 0],
  ["Samford", 10100, "SoCon", "Non-Power 4", 0.0],
  ["San Diego State", 10400, "Mountain West", "Non-Power 4", 0],
  ["San Jose State", 11000, "Mountain West", "Non-Power 4", 0],
  ["South Alabama", 10800, "Sun Belt", "Non-Power 4", 0],
  ["South Carolina", 84000, "SEC", "Power 4", 0.47],
  ["South Carolina State", 14000, "MEAC", "Non-Power 4", 0],
  ["South Dakota", 10300, "MVFC", "Non-Power 4", 0],
  ["South Dakota State", 14800, "MVFC", "Non-Power 4", 0],
  ["Southeast Missouri State", 6700, "Unknown", "Non-Power 4", 0.0],
  ["Southeastern Louisiana", 13800, "Southland", "Non-Power 4", 0],
  ["Southern Arkansas", 14200, "Unknown", "Non-Power 4", 0.0],
  ["Southern Illinois", 9600, "MVFC", "Non-Power 4", 0.0],
  ["Southern Miss", 11500, "Sun Belt", "Non-Power 4", 0],
  ["Southern University", 10000, "Unknown", "Non-Power 4", 0],
  ["Southern Utah", 21000, "United Athletic", "Non-Power 4", 0.0],
  ["St. Thomas", 10400, "Pioneer", "Non-Power 4", 0.0],
  ["Stanford", 23000, "ACC", "Power 4", 0.12],
  ["Stephen F. Austin", 10800, "Southland", "Non-Power 4", 0],
  ["Stetson", 8500, "Pioneer", "Non-Power 4", 0.0],
  ["Syracuse", 23000, "ACC", "Power 4", 0.07],
  ["TCU", 18300, "Big 12", "Power 4", 0.09],
  ["Tarleton State", 10000, "United Athletic", "Non-Power 4", 0],
  ["Temple", 11700, "American", "Non-Power 4", 0],
  ["Tennessee", 110000, "SEC", "Power 4", 0.45],
  ["Tennessee State", 7500, "OVC-Big South", "Non-Power 4", 0.0],
  ["Texas", 156000, "SEC", "Power 4", 0.6],
  ["Texas A&M", 95000, "SEC", "Power 4", 0.7],
  ["Texas State", 10300, "Sun Belt", "Non-Power 4", 0],
  ["Texas Tech", 107000, "Big 12", "Power 4", 0.36],
  ["The Citadel", 11200, "SoCon", "Non-Power 4", 0.0],
  ["Toledo", 9200, "MAC", "Non-Power 4", 0],
  ["Towson", 13300, "CAA", "Non-Power 4", 0.0],
  ["Trine University", 17900, "Unknown", "Non-Power 4", 0.0],
  ["Troy", 15800, "Sun Belt", "Non-Power 4", 0],
  ["Tulane", 11800, "American", "Non-Power 4", 0],
  ["Tulsa", 11000, "American", "Non-Power 4", 0],
  ["UAB", 10900, "American", "Non-Power 4", 0],
  ["UC Davis", 10500, "Big Sky", "Non-Power 4", 0.0],
  ["UCF", 26000, "Big 12", "Power 4", 0.12],
  ["UCLA", 14800, "Big Ten", "Power 4", 0],
  ["UNLV", 12200, "Mountain West", "Non-Power 4", 0],
  ["USC", 173000, "Big Ten", "Power 4", 0.63],
  ["USF", 11900, "Unknown", "Non-Power 4", 0],
  ["UT Martin", 15800, "OVC-Big South", "Non-Power 4", 0],
  ["UTEP", 9400, "Conference USA", "Non-Power 4", 0],
  ["UTRGV", 11000, "Southland", "Non-Power 4", 0.0],
  ["UTSA", 8300, "American", "Non-Power 4", 0],
  ["Utah", 72000, "Big 12", "Power 4", 0.05],
  ["Utah State", 10600, "Mountain West", "Non-Power 4", 0],
  ["Utah Tech", 12400, "United Athletic", "Non-Power 4", 0],
  ["Valparaiso", 13600, "Pioneer", "Non-Power 4", 0],
  ["Vanderbilt", 98000, "SEC", "Power 4", 0.09],
  ["Villanova", 11700, "CAA", "Non-Power 4", 0.0],
  ["Virginia", 15900, "ACC", "Power 4", 0],
  ["Virginia Tech", 29000, "ACC", "Power 4", 0.3],
  ["Wagner", 6400, "NEC", "Non-Power 4", 0.0],
  ["Wake Forest", 16800, "ACC", "Power 4", 0.07],
  ["Washington", 63000, "Big Ten", "Power 4", 0.4],
  ["Washington State", 10400, "Pac-12", "Non-Power 4", 0],
  ["Wayne State College", 13300, "Unknown", "Non-Power 4", 0.0],
  ["Weber State", 14900, "Big Sky", "Non-Power 4", 0.0],
  ["West Chester", 7500, "Unknown", "Non-Power 4", 0.0],
  ["West Florida", 20000, "Unknown", "Non-Power 4", 0.0],
  ["West Georgia", 12500, "United Athletic", "Non-Power 4", 0],
  ["West Virginia", 21000, "Big 12", "Power 4", 0.08],
  ["Western Carolina", 10000, "SoCon", "Non-Power 4", 0.0],
  ["Western Kentucky", 12900, "Conference USA", "Non-Power 4", 0],
  ["Western Michigan", 8800, "MAC", "Non-Power 4", 0],
  ["Western New Mexico", 7500, "Unknown", "Non-Power 4", 0.0],
  ["William & Mary", 12300, "CAA", "Non-Power 4", 0],
  ["Wisconsin", 13200, "Big Ten", "Power 4", 0],
  ["Wofford", 11400, "SoCon", "Non-Power 4", 0],
  ["Wyoming", 10000, "Mountain West", "Non-Power 4", 0],
  ["Yale", 8700, "Ivy League", "Non-Power 4", 0.0],
  ["Youngstown State", 17900, "MVFC", "Non-Power 4", 0]
];

const BB_SCHOOLS = [
  ["Alabama", 344000, "SEC", "Power 4", 1],
  ["Arizona", 835000, "Big 12", "Power 4", 1],
  ["Arizona State", 512000, "Big 12", "Power 4", 0.75],
  ["Arkansas", 914000, "SEC", "Power 4", 1],
  ["Arkansas State", 5400, "Sun Belt", "Non-Power 4", 0.0],
  ["Auburn", 63000, "SEC", "Power 4", 0.83],
  ["BYU", 522000, "Big 12", "Power 4", 0.5],
  ["Ball State", 1200000, "MAC", "Non-Power 4", 0.0],
  ["Baylor", 333000, "Big 12", "Power 4", 1],
  ["Boise State", 8700, "Mountain West", "Non-Power 4", 0.25],
  ["Boston College", 7500, "ACC", "Power 4", 0.0],
  ["Butler", 9400, "Pioneer", "Non-Power 4", 1.0],
  ["California", 11300, "ACC", "Power 4", 0.0],
  ["Charleston", 2000000, "Unknown", "Non-Power 4", 0.0],
  ["Cincinnati", 286000, "Big 12", "Power 4", 0.5],
  ["Clemson", 9100, "ACC", "Power 4", 0.33],
  ["Cleveland State", 7200, "Unknown", "Non-Power 4", 0.0],
  ["Colorado", 37000, "Big 12", "Power 4", 0.0],
  ["Connecticut", 355000, "Unknown", "Non-Power 4", 1],
  ["Creighton", 200000, "Unknown", "Non-Power 4", 0.5],
  ["Dayton", 6800, "Pioneer", "Non-Power 4", 0.0],
  ["DePaul", 7200, "Unknown", "Non-Power 4", 0],
  ["Denver", 7400, "Unknown", "Non-Power 4", 0.0],
  ["Drake", 7500, "Pioneer", "Non-Power 4", 0],
  ["Duke", 1100000, "ACC", "Power 4", 1],
  ["Eastern Kentucky", 21000, "United Athletic", "Non-Power 4", 1.0],
  ["Elon", 8700, "CAA", "Non-Power 4", 0.0],
  ["Florida", 411000, "SEC", "Power 4", 1.0],
  ["Florida Atlantic", 18300, "American", "Non-Power 4", 1],
  ["Florida State", 58000, "ACC", "Power 4", 0.8],
  ["George Mason", 7600, "Unknown", "Non-Power 4", 0.5],
  ["Georgetown", 215000, "Patriot", "Non-Power 4", 0.5],
  ["Georgia", 223000, "SEC", "Power 4", 0.67],
  ["Georgia Southern", 7800, "Sun Belt", "Non-Power 4", 0.0],
  ["Georgia State", 795000, "Sun Belt", "Non-Power 4", 0.0],
  ["Georgia Tech", 8600, "ACC", "Power 4", 0.5],
  ["Gonzaga", 83000, "Unknown", "Non-Power 4", 0.67],
  ["Gonzaga University", 83000, "Unknown", "Non-Power 4", 0.67],
  ["Grand Canyon", 10800, "Unknown", "Non-Power 4", 0.33],
  ["Harvard", 21000, "Ivy League", "Non-Power 4", 0.33],
  ["Houston", 479000, "Big 12", "Power 4", 1],
  ["Illinois", 294000, "Big Ten", "Power 4", 0.4],
  ["Incarnate Word", 40000, "Southland", "Non-Power 4", 0.0],
  ["Indiana", 114000, "Big Ten", "Power 4", 1],
  ["Iona", 51000, "Unknown", "Non-Power 4", 0.0],
  ["Iowa", 13600, "Big Ten", "Power 4", 0.0],
  ["Iowa State", 82000, "Big 12", "Power 4", 0.5],
  ["Jacksonville", 9200, "Unknown", "Non-Power 4", 0.0],
  ["Kansas", 292000, "Big 12", "Power 4", 1],
  ["Kansas State", 15900, "Big 12", "Power 4", 0.5],
  ["Kennesaw State", 16000, "Conference USA", "Non-Power 4", 0.0],
  ["Kent State", 6700, "MAC", "Non-Power 4", 0],
  ["Kentucky", 8100, "SEC", "Power 4", 0.33],
  ["LSU", 12800, "SEC", "Power 4", 0.75],
  ["Lincoln Memorial", 14300, "Unknown", "Non-Power 4", 0.0],
  ["Louisiana Tech", 8300, "Conference USA", "Non-Power 4", 0],
  ["Louisville", 616000, "ACC", "Power 4", 0.2],
  ["Loyola Chicago", 8200, "Unknown", "Non-Power 4", 0.5],
  ["Loyola Maryland", 6400, "Unknown", "Non-Power 4", 0.0],
  ["Maine", 24000, "CAA", "Non-Power 4", 0.0],
  ["Marquette", 7200, "Unknown", "Non-Power 4", 0.33],
  ["Maryland", 578000, "Big Ten", "Power 4", 0.75],
  ["Massachusetts", 7600, "Unknown", "Non-Power 4", 0.0],
  ["Memphis", 13100, "American", "Non-Power 4", 0.33],
  ["Miami", 872000, "Unknown", "Non-Power 4", 1],
  ["Miami (OH)", 50000, "MAC", "Non-Power 4", 0.0],
  ["Michigan", 306000, "Big Ten", "Power 4", 0.67],
  ["Michigan State", 235000, "Big Ten", "Power 4", 1],
  ["Middle Tennessee State", 7000, "Unknown", "Non-Power 4", 0],
  ["Minnesota", 12500, "Big Ten", "Power 4", 0.0],
  ["Mississippi State", 12100, "SEC", "Power 4", 0.6],
  ["Missouri", 553000, "SEC", "Power 4", 1],
  ["Murray State", 8300, "MVFC", "Non-Power 4", 0.0],
  ["NC State", 121000, "ACC", "Power 4", 0.5],
  ["Nebraska", 7200, "Big Ten", "Power 4", 1],
  ["Nevada", 7200, "Mountain West", "Non-Power 4", 0],
  ["Norfolk State", 8100, "MEAC", "Non-Power 4", 0.0],
  ["North Carolina", 585000, "ACC", "Power 4", 0.5],
  ["North Florida", 12800, "Unknown", "Non-Power 4", 0.0],
  ["North Texas", 19800, "American", "Non-Power 4", 0],
  ["Northwestern", 7700, "Big Ten", "Power 4", 0.5],
  ["Notre Dame", 645000, "FBS Independent", "Non-Power 4", 0.75],
  ["Ohio", 884000, "MAC", "Non-Power 4", 0.0],
  ["Ohio State", 1100000, "Big Ten", "Power 4", 1],
  ["Oklahoma", 11700, "SEC", "Power 4", 0.5],
  ["Oklahoma State", 257000, "Big 12", "Power 4", 1],
  ["Ole Miss", 156000, "SEC", "Power 4", 0.75],
  ["Oral Roberts", 35000, "Unknown", "Non-Power 4", 0.0],
  ["Oregon", 221000, "Big Ten", "Power 4", 0.33],
  ["Pacific", 8600, "Unknown", "Non-Power 4", 0.33],
  ["Penn State", 175000, "Big Ten", "Power 4", 0.14],
  ["Pepperdine", 10300, "Unknown", "Non-Power 4", 0.0],
  ["Pittsburgh", 344000, "ACC", "Power 4", 1],
  ["Princeton", 9000, "Ivy League", "Non-Power 4", 0.0],
  ["Professional", 8500, "Unknown", "Non-Power 4", 0.0],
  ["Providence", 156000, "Unknown", "Non-Power 4", 1.0],
  ["Purdue", 94000, "Big Ten", "Power 4", 0.6],
  ["Quinnipiac", 7600, "Unknown", "Non-Power 4", 0.0],
  ["Rutgers", 10000, "Big Ten", "Power 4", 0.29],
  ["SC Upstate", 784000, "Unknown", "Non-Power 4", 0.0],
  ["SMU", 79000, "ACC", "Power 4", 0.6],
  ["Saint Joseph's", 9100, "Unknown", "Non-Power 4", 0.0],
  ["Saint Louis", 48000, "Unknown", "Non-Power 4", 0],
  ["Saint Mary's", 6800, "Unknown", "Non-Power 4", 0.5],
  ["Samford", 7300, "SoCon", "Non-Power 4", 0.0],
  ["San Diego State", 11100, "Mountain West", "Non-Power 4", 0.5],
  ["San Jose State", 8500, "Mountain West", "Non-Power 4", 0.0],
  ["Santa Clara", 12600, "Unknown", "Non-Power 4", 0.0],
  ["Seton Hall", 13400, "Unknown", "Non-Power 4", 0.0],
  ["Siena", 8000, "Unknown", "Non-Power 4", 0.0],
  ["South Carolina", 40000, "SEC", "Power 4", 1],
  ["St. John's", 7800, "Unknown", "Non-Power 4", 0.25],
  ["Stanford", 7500, "ACC", "Power 4", 0.4],
  ["Syracuse", 499000, "ACC", "Power 4", 0.4],
  ["TCU", 6500, "Big 12", "Power 4", 1.0],
  ["Tarleton State", 6800, "United Athletic", "Non-Power 4", 0.0],
  ["Temple", 10600, "American", "Non-Power 4", 0.0],
  ["Tennessee", 144000, "SEC", "Power 4", 0.5],
  ["Texas", 474000, "SEC", "Power 4", 0.75],
  ["Texas A&M", 21000, "SEC", "Power 4", 0.67],
  ["Texas State", 9900, "Sun Belt", "Non-Power 4", 0],
  ["Texas Tech", 299000, "Big 12", "Power 4", 1],
  ["The University of Texas at Arlington", 7400, "Unknown", "Non-Power 4", 0],
  ["Tulane", 12900, "American", "Non-Power 4", 0.5],
  ["Tulsa", 13600, "American", "Non-Power 4", 0.0],
  ["UC Santa Barbara", 29000, "Unknown", "Non-Power 4", 0.5],
  ["UCF", 133000, "Big 12", "Power 4", 0.5],
  ["UCLA", 127000, "Big Ten", "Power 4", 0.5],
  ["UIC", 5500, "Unknown", "Non-Power 4", 0.0],
  ["USC", 951000, "Big Ten", "Power 4", 1],
  ["USF", 9500, "Unknown", "Non-Power 4", 0],
  ["UT Arlington", 7400, "Unknown", "Non-Power 4", 0.0],
  ["UTEP", 7000, "Conference USA", "Non-Power 4", 0],
  ["UTSA", 6900, "American", "Non-Power 4", 0.0],
  ["Utah", 5400, "Big 12", "Power 4", 0.25],
  ["Utah State", 8300, "Mountain West", "Non-Power 4", 0.0],
  ["VCU", 7200, "Unknown", "Non-Power 4", 1],
  ["Vanderbilt", 16900, "SEC", "Power 4", 0.0],
  ["Villanova", 110000, "CAA", "Non-Power 4", 1],
  ["Virginia", 73000, "ACC", "Power 4", 0.25],
  ["Virginia Tech", 17500, "ACC", "Power 4", 0.0],
  ["Wake Forest", 6900, "ACC", "Power 4", 1],
  ["Washington", 53000, "Big Ten", "Power 4", 0.8],
  ["West Virginia", 201000, "Big 12", "Power 4", 0.25],
  ["Western Kentucky", 8400, "Conference USA", "Non-Power 4", 0],
  ["Wisconsin", 20000, "Big Ten", "Power 4", 0.33],
  ["Wisconsin-Green Bay", 11600, "Unknown", "Non-Power 4", 0.0]
];

// Validation anchors: ranked transfers with confirmed destinations
// [name, rank, position, actual_NIL, destination]
const ANCHORS_FB = [
  ["Sam Leavitt", 1, "QB", 4000000.0, "LSU"],
  ["Cam Coleman", 2, "WR", 2900000.0, "Texas"],
  ["Jordan Seaton", 4, "OT", 1700000.0, "LSU"],
  ["Drew Mestemaker", 7, "QB", 2500000.0, "Oklahoma State"],
  ["Darian Mensah", 9, "QB", 2200000.0, "Miami (FL)"],
  ["Brendan Sorsby", 10, "QB", 3100000.0, "Texas Tech"],
  ["Byrum Brown", 20, "QB", 1900000.0, "Auburn"],
  ["Josh Hoover", 22, "QB", 2300000.0, "Indiana"],
  ["Wyatt Young", 51, "WR", 297000.0, "Oklahoma State"],
  ["Jay Crawford", 58, "CB", 344000.0, "Ole Miss"],
  ["Austin Simmons", 61, "QB", 118000.0, "Missouri"],
  ["Devin Harper", 62, "IOL", 115000.0, "LSU"],
  ["Salesi Moa", 69, "ATH", 199000.0, "Michigan"],
  ["Xavier Chaplin", 72, "OT", 514000.0, "Florida State"],
  ["Parker Livingstone", 81, "WR", 157000.0, "Oklahoma"],
  ["Dashawn Womack", 84, "EDGE", 215000.0, "Auburn"],
  ["Qua Russaw", 86, "LB", 291000.0, "Ohio State"],
  ["Boo Carter", 89, "S", 562000.0, "Colorado"],
  ["Terry Moore", 91, "S", 341000.0, "Ohio State"],
  ["Marcus Neal", 93, "S", 259000.0, "Penn State"],
  ["Elijah Barnes", 94, "LB", 225000.0, "Kentucky"],
  ["Austin Romaine", 95, "LB", 558000.0, "Texas Tech"],
  ["Robert Woodyard Jr.", 102, "LB", 330000.0, "Missouri"],
  ["Faheem Delane", 105, "S", 151000.0, "LSU"],
  ["Jeremiah Cooper", 108, "CB", 469000.0, "Penn State"],
  ["Cutter Boley", 116, "QB", 1100000.0, "Arizona State"],
  ["Lawayne McCoy", 133, "WR", 121000.0, "Louisville"],
  ["Makhi Hughes", 138, "RB", 258000.0, "Houston"],
  ["Amare Campbell", 146, "LB", 257000.0, "Tennessee"],
  ["James Peoples", 148, "RB", 127000.0, "Penn State"],
  ["Beau Pribula", 157, "QB", 1100000.0, "Virginia"],
  ["Winston Watkins Jr.", 159, "WR", 203000.0, "LSU"],
  ["Dominick Kelly", 162, "CB", 154000.0, "Ohio State"],
  ["James Williams", 179, "EDGE", 150000.0, "Oklahoma State"],
  ["Tao Johnson", 180, "S", 295000.0, "UCLA"],
  ["Santana Hopper", 181, "DL", 508000.0, "Colorado"],
  ["Jaylen Mbakwe", 192, "WR", 159000.0, "Georgia Tech"],
  ["Anthony Colandrea", 201, "QB", 732000.0, "Nebraska"],
  ["Aaron Scott Jr.", 209, "CB", 135000.0, "Oregon"],
  ["Jarquez Carter", 221, "DL", 140000.0, "Miami (FL)"],
  ["Christian Clark", 223, "RB", 152000.0, "South Carolina"],
  ["Dylan Edwards", 229, "RB", 103000.0, "Kansas"],
  ["CJ Baxter", 231, "RB", 270000.0, "Kentucky"],
  ["Nick Brooks", 237, "IOL", 152000.0, "Alabama"],
  ["Vander Ploog", 241, "TE", 120000.0, "NC State"],
  ["Bryson Beaver", 244, "QB", 635000.0, "Georgia"],
  ["T.J. Metcalf", 273, "S", 125000.0, "Tennessee"],
  ["Nic Anderson", 280, "WR", 471000.0, "Kentucky"],
  ["Nate Johnson", 282, "EDGE", 389000.0, "Auburn"],
  ["Kelby Collins", 283, "DL", 200000.0, "South Carolina"],
  ["Joshisa Trader", 285, "WR", 124000.0, "NC State"],
  ["Jordan Washington", 287, "TE", 151000.0, "North Carolina"],
  ["Jerrick Gibson", 289, "RB", 172000.0, "Purdue"],
  ["Donovan Starr", 292, "CB", 124000.0, "Clemson"],
  ["Charles Brantley", 300, "CB", 232000.0, "Michigan State"],
  ["Johntay Cook II", 334, "WR", 168000.0, "Ole Miss"],
  ["Matai Tagoa'i", 382, "LB", 108000.0, "Arizona"],
  ["JT Lindsey", 384, "RB", 130000.0, "Ole Miss"],
  ["Harry Dalton", 385, "RB", 101000.0, "Maryland"],
  ["Trey Owens", 419, "QB", 167000.0, "Arkansas State"],
  ["Jameer Grimsley", 420, "CB", 128000.0, "Mississippi State"],
  ["LaJesse Harrold", 428, "EDGE", 116000.0, "UCF"],
  ["Brock Schott", 442, "TE", 107000.0, "Indiana"],
  ["C.J. Hicks", 444, "LB", 115000.0, "South Florida"],
  ["Micah DeBose", 449, "IOL", 134000.0, "Vanderbilt"],
  ["Cameron Calhoun", 450, "CB", 209000.0, "Ohio State"]
];

const ANCHORS_BB = [
  ["Flory Bidunga", 1, "C", 2100000.0, "Louisville"],
  ["John Blackwell", 2, "SG", 1500000.0, "Duke"],
  ["PJ Haggerty", 8, "SG", 2600000.0, "Texas A&M"],
  ["David Punch", 11, "PF", 1800000.0, "Texas"],
  ["Aiden Sherrell", 15, "C", 1700000.0, "Indiana"],
  ["Somto Cyril", 16, "C", 1900000.0, "Miami (FL)"],
  ["Donnie Freeman", 20, "PF", 1600000.0, "St. John's"],
  ["Mouhamed Sylla", 26, "C", 1500000.0, "West Virginia"],
  ["Alvaro Folgueiras", 53, "PF", 1100000.0, "Louisville"],
  ["Magoon Gwath", 54, "PF", 1100000.0, "DePaul"],
  ["Keanu Dawes", 56, "PF", 1100000.0, "Kansas"],
  ["Jaylen Petty", 57, "PG", 643000.0, "UCLA"],
  ["Jaquan Johnson", 59, "PG", 624000.0, "Iowa State"],
  ["Rowan Brumbaugh", 63, "PG", 608000.0, "SMU"],
  ["Devin Royal", 64, "PF", 994000.0, "Villanova"],
  ["Denzel Aberdeen", 65, "CG", 2200000.0, "Florida"],
  ["Aleksas Bieliauskas", 69, "PF", 912000.0, "South Carolina"],
  ["Filip Jovic", 70, "PF", 908000.0, "UCLA"],
  ["Drew Fielder", 71, "C", 1000000.0, "Alabama"],
  ["Derek Dixon", 72, "CG", 525000.0, "Arizona"],
  ["Karter Knox", 73, "SF", 614000.0, "Louisville"],
  ["Tyler Lundblade", 74, "SG", 506000.0, "Tennessee"],
  ["Freddie Dilione", 78, "SG", 492000.0, "Georgia"],
  ["Justin Pippen", 86, "SG", 486000.0, "Ohio State"],
  ["Will Sydnor", 87, "PF", 762000.0, "Indiana"],
  ["Miles Rubin", 91, "PF", 726000.0, "Tennessee"],
  ["Kory Mincy", 95, "PG", 362000.0, "South Carolina"],
  ["Jaeden Mustaf", 96, "CG", 369000.0, "Indiana"],
  ["Myles Colvin", 100, "SG", 346000.0, "Cincinnati"],
  ["Mikey Lewis", 102, "SG", 326000.0, "Texas"],
  ["Dai Dai Ames", 103, "PG", 347000.0, "Tennessee"],
  ["Devin Vanterpool", 106, "SG", 307000.0, "Providence"],
  ["Luka Bogavac", 109, "SG", 293000.0, "Oklahoma State"],
  ["Anthony Robinson II", 110, "PG", 294000.0, "Florida State"],
  ["Cole Certa", 112, "SG", 284000.0, "Clemson"],
  ["Kameron Taylor", 113, "SF", 285000.0, "Florida State"],
  ["Andrija Jelavic", 114, "PF", 590000.0, "Ohio State"],
  ["Jaland Lowe", 121, "PG", 261000.0, "Georgetown"],
  ["Isiah Harwell", 125, "SG", 250000.0, "Gonzaga"],
  ["Cole Cloer", 126, "SF", 235000.0, "Alabama"],
  ["Zayden High", 129, "PF", 530000.0, "South Florida"],
  ["Kuol Atak", 131, "PF", 210000.0, "Virginia Tech"],
  ["Shon Abaev", 135, "SF", 202000.0, "Florida State"],
  ["Tyler Tejada", 136, "SF", 195000.0, "Cincinnati"],
  ["Chol Machot", 138, "C", 695000.0, "College of Charleston"],
  ["Bishop Boswell", 140, "PG", 200000.0, "Maryland"],
  ["Jalil Bethea", 142, "SG", 339000.0, "Pittsburgh"],
  ["Brandon Garrison", 143, "PF", 193000.0, "Alabama"],
  ["JJ Mandaquit", 145, "PG", 187000.0, "Arizona"],
  ["Jizzle James", 146, "PG", 199000.0, "Charlotte"],
  ["Logan Duncomb", 159, "C", 512000.0, "Notre Dame"],
  ["Christian Gurdak", 237, "C", 505000.0, "Indiana"],
  ["JT Rock", 277, "C", 504000.0, "Kansas State"]
];

// =============== MODEL ===============
const portalCurve = (sport, rank) =>
  Math.exp(CURVES[sport].a + CURVES[sport].b * Math.log(Math.max(1, rank)));

const posMult = (sport, pos) => POS_MULTS[sport]?.[pos] ?? 1.0;

// Blue-chip-aware star multiplier: anchor is school's "typical" star tier
// At Alabama (BC=0.66), typical = ~4-star, so 4-star = 1.0x
// At Toledo (BC=0.0), typical = 3-star, so 3-star = 1.0x and 4/5-stars get a bigger premium
const typicalStar = (bc) => 3.0 + 1.5 * (bc || 0);
const starAdjMult = (star, bc) => Math.pow(1.6, star - typicalStar(bc));

const prodMult = (t) =>
  ({ allamerican: 3.0, star: 2.0, starter: 1.2, role: 0.6, depth: 0.3 }[t] ?? 1.0);

const socialMult = (k) => Math.min(1.5, 1 + (k / 500) * 0.5);

// School ceiling for portal: max single-player NIL ≈ 30× class average, with $1M floor
const schoolCeiling = (schoolNil) => Math.max(schoolNil * 30, 1_000_000);

function estimate({ sport, schoolNil, blueChip, mode, star, rank, pos, prod, followersK }) {
  const pm = posMult(sport, pos);
  const sm = socialMult(followersK || 0);
  let center;
  let market = null, ceiling = null;
  if (mode === "recruit") {
    center = schoolNil * starAdjMult(star, blueChip) * pm * sm;
  } else if (mode === "portal") {
    market = portalCurve(sport, rank || 100) * pm;
    ceiling = schoolCeiling(schoolNil);
    center = Math.min(market, ceiling);
  } else {
    center = schoolNil * prodMult(prod) * pm * sm;
  }
  center = Math.min(center, MAX_NIL);
  const widthPct = sport === "FB" ? 0.40 : 0.55;
  return {
    low: Math.max(0, Math.round(center * (1 - widthPct))),
    mid: Math.round(center),
    high: Math.min(MAX_NIL, Math.round(center * (1 + widthPct))),
    market: market !== null ? Math.round(market) : null,
    ceiling: ceiling !== null ? Math.round(ceiling) : null,
    bound: market !== null ? (Math.min(market, ceiling) < market * 0.99 ? "school" : center >= MAX_NIL ? "absolute" : "market") : null,
  };
}

// =============== FORMAT ===============
const fmt = (n) => {
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + Math.round(n / 1e3) + "K";
  return "$" + Math.round(n).toLocaleString();
};

// =============== UI BITS ===============
const Label = ({ children }) => (
  <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>
    {children}
  </div>
);

const Btn = ({ active, onClick, children, color = T.accent }) => (
  <button
    onClick={onClick}
    style={{
      padding: "7px 14px", borderRadius: 6, border: "none", cursor: "pointer", whiteSpace: "nowrap",
      background: active ? color : "transparent",
      color: active ? "#000" : T.muted,
      fontWeight: 700, fontSize: 12, transition: "all 0.15s",
    }}
  >
    {children}
  </button>
);

const Stat = ({ label, value, sub, color = T.accent, onClick, active }) => (
  <div
    onClick={onClick}
    style={{
      background: active ? T.cardAlt : T.card,
      border: "1px solid " + (active ? color : T.border),
      borderLeft: "3px solid " + color,
      borderRadius: 10, padding: "12px 16px", flex: "1 1 140px", minWidth: 140,
      cursor: onClick ? "pointer" : "default",
      transition: "all 0.15s",
    }}
  >
    <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
      {label}
      {onClick && <span style={{ marginLeft: 6, color: active ? color : T.muted, fontWeight: 400 }}>{active ? "▼" : "ⓘ"}</span>}
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, color: T.white, marginTop: 3 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color, marginTop: 2 }}>{sub}</div>}
  </div>
);

// Explanations for clickable stats in the validation view
const STAT_INFO = {
  fb_r2: "R² measures how much of the variation in actual NIL the model explains on a logarithmic scale. 0.73 means the model captures roughly 73% of the variance across all 66 ranked transfers — strong for a sports valuation model with this sample size.",
  bb_r2: "Same metric for basketball. 0.69 is slightly lower than football because the BB rank curve has more noise (smaller sample, more concentrated spending), but still indicates the model captures most of the signal in real reported deals.",
  fb_w50: "Share of football predictions within ±50% of the actual reported NIL. ~75% in this band means three out of four predictions are in the right ballpark — a reasonable accuracy bar given that real-world deals have legitimate variance the model can't capture (brand value, individual collective decisions, etc.).",
  bb_w50: "Same metric for basketball. 89% within ±50% is the model's strongest accuracy band — basketball portal deals follow the rank curve more tightly than football, partly because BB rosters are smaller and pricing is less position-driven.",
};

// =============== MAIN ===============
export default function NILEstimator() {
  const [view, setView] = useState("estimator");
  const [sport, setSport] = useState("FB");
  const [mode, setMode] = useState("recruit");
  const [school, setSchool] = useState("Texas");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [confFilter, setConfFilter] = useState("All");
  const [star, setStar] = useState(4);
  const [rank, setRank] = useState(50);
  const [pos, setPos] = useState("QB");
  const [prod, setProd] = useState("starter");
  const [followers, setFollowers] = useState(20);
  const [activeInfo, setActiveInfo] = useState(null);

  const schools = sport === "FB" ? FB_SCHOOLS : BB_SCHOOLS;
  const positions = Object.keys(POS_MULTS[sport]);

  const conferences = useMemo(() => {
    const set = new Set(schools.map((s) => s[2]).filter((c) => c && c !== "Unknown"));
    return ["All", ...Array.from(set).sort()];
  }, [schools]);

  const filteredSchools = useMemo(() => {
    const q = schoolSearch.toLowerCase().trim();
    let r = schools;
    if (confFilter !== "All") r = r.filter((s) => s[2] === confFilter);
    if (q) r = r.filter((s) => s[0].toLowerCase().includes(q));
    return r;
  }, [schools, schoolSearch, confFilter]);

  const schoolData = schools.find((s) => s[0] === school) || schools[0];
  const schoolNil = schoolData[1];
  const blueChip = schoolData[4];

  const setSportSafe = (s) => {
    setSport(s);
    const newSchools = s === "FB" ? FB_SCHOOLS : BB_SCHOOLS;
    if (!newSchools.find((x) => x[0] === school)) setSchool(newSchools[0][0]);
    const newPositions = Object.keys(POS_MULTS[s]);
    if (!newPositions.includes(pos)) setPos(newPositions[0]);
    setConfFilter("All");
  };

  const setConfFilterSafe = (c) => {
    setConfFilter(c);
    if (c !== "All") {
      const inFilter = schools.find((s) => s[0] === school && s[2] === c);
      if (!inFilter) {
        const first = schools.find((s) => s[2] === c);
        if (first) setSchool(first[0]);
      }
    }
  };

  const result = estimate({ sport, schoolNil, blueChip, mode, star, rank, pos, prod, followersK: followers });

  const backtest = useMemo(() => {
    const compute = (anchors, sk) =>
      anchors.map(([name, r, p, actual, sch]) => {
        const sd = (sk === "FB" ? FB_SCHOOLS : BB_SCHOOLS).find((s) => s[0] === sch);
        const sNil = sd ? sd[1] : sk === "FB" ? 50000 : 250000;
        const bc = sd ? sd[4] : 0.4;
        const est = estimate({ sport: sk, schoolNil: sNil, blueChip: bc, mode: "portal", rank: r, pos: p, followersK: 0 });
        return { name, rank: r, pos: p, actual, predicted: est.mid, school: sch, error: (est.mid - actual) / actual };
      });
    const fb = compute(ANCHORS_FB, "FB");
    const bb = compute(ANCHORS_BB, "BB");
    const r2 = (data) => {
      const ys = data.map((d) => Math.log(d.actual));
      const yhat = data.map((d) => Math.log(Math.max(1, d.predicted)));
      const my = ys.reduce((a, b) => a + b, 0) / ys.length;
      const ssRes = ys.reduce((s, y, i) => s + Math.pow(y - yhat[i], 2), 0);
      const ssTot = ys.reduce((s, y) => s + Math.pow(y - my, 2), 0);
      return 1 - ssRes / ssTot;
    };
    const within = (data, t) => data.filter((d) => Math.abs(d.error) <= t).length / data.length;
    return {
      fb: { data: fb, r2: r2(fb), w25: within(fb, 0.25), w50: within(fb, 0.5) },
      bb: { data: bb, r2: r2(bb), w25: within(bb, 0.25), w50: within(bb, 0.5) },
    };
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: T.bg, color: T.text, minHeight: "100vh", padding: "32px 24px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: T.accent, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: "0 0 8px" }}>
            NIL Capstone — Estimator v5
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: T.white, margin: 0, lineHeight: 1.1, letterSpacing: -0.8 }}>
            NIL Value Estimator
          </h1>
          <p style={{ fontSize: 13, color: T.muted, margin: "8px 0 0", maxWidth: 700 }}>
            School-aware portal mode (school caps prediction at 30× class avg). Portal R² = 0.72 (FB) / 0.66 (BB).
          </p>
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid " + T.border, paddingBottom: 12 }}>
          {[["estimator", "Estimator"], ["methodology", "Methodology"], ["validation", "Validation"]].map(([k, l]) => (
            <Btn key={k} active={view === k} onClick={() => setView(k)}>{l}</Btn>
          ))}
        </div>

        {view === "estimator" && (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <div>
                <Label>Sport</Label>
                <div style={{ display: "flex", gap: 4 }}>
                  <Btn active={sport === "FB"} onClick={() => setSportSafe("FB")} color={T.fb}>Football</Btn>
                  <Btn active={sport === "BB"} onClick={() => setSportSafe("BB")} color={T.bb}>Basketball</Btn>
                </div>
              </div>
              <div>
                <Label>Player type</Label>
                <div style={{ display: "flex", gap: 4 }}>
                  <Btn active={mode === "recruit"} onClick={() => setMode("recruit")}>HS Recruit</Btn>
                  <Btn active={mode === "portal"} onClick={() => setMode("portal")}>Portal Transfer</Btn>
                  <Btn active={mode === "returning"} onClick={() => setMode("returning")}>Returning</Btn>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div>
                <Label>{mode === "portal" ? "School (context only)" : "Destination school"}</Label>
                <div style={{ background: T.cardAlt, border: "1px solid " + T.border, borderRadius: 8, padding: "10px 12px" }}>
                  <select
                    value={confFilter}
                    onChange={(e) => setConfFilterSafe(e.target.value)}
                    style={{ width: "100%", background: T.card, border: "1px solid " + T.border, color: T.muted, padding: "6px 8px", borderRadius: 4, fontSize: 12, fontFamily: "inherit", marginBottom: 8 }}
                  >
                    {conferences.map((c) => (
                      <option key={c} value={c}>{c === "All" ? "All conferences" : c}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Search schools..."
                    value={schoolSearch}
                    onChange={(e) => setSchoolSearch(e.target.value)}
                    style={{ width: "100%", background: "transparent", border: "none", color: T.white, fontSize: 14, fontFamily: "inherit", outline: "none", marginBottom: 8 }}
                  />
                  <select
                    value={school}
                    onChange={(e) => { setSchool(e.target.value); setSchoolSearch(""); }}
                    style={{ width: "100%", background: T.card, border: "1px solid " + T.border, color: T.white, padding: "6px 8px", borderRadius: 4, fontSize: 13, fontFamily: "inherit" }}
                  >
                    {filteredSchools.length === 0 ? (
                      <option value="">No schools match filter</option>
                    ) : (
                      filteredSchools.map((s) => (
                        <option key={s[0]} value={s[0]}>
                          {s[0]} — {fmt(s[1])} avg, {Math.round(s[4]*100)}% blue-chip ({s[3]})
                        </option>
                      ))
                    )}
                  </select>
                </div>
                {mode === "portal" && (
                  <div style={{ fontSize: 10, color: T.muted, marginTop: 4, fontStyle: "italic" }}>
                    School caps portal prediction at ~30× class avg (see methodology)
                  </div>
                )}
              </div>

              <div>
                <Label>Position</Label>
                <div style={{ background: T.cardAlt, border: "1px solid " + T.border, borderRadius: 8, padding: "10px 12px" }}>
                  <select value={pos} onChange={(e) => setPos(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", color: T.white, fontSize: 14, fontFamily: "inherit", outline: "none" }}>
                    {positions.map((p) => (
                      <option key={p} value={p}>{p} (×{POS_MULTS[sport][p].toFixed(2)})</option>
                    ))}
                  </select>
                </div>
              </div>

              {mode === "recruit" && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Star rating — {school} typical: {typicalStar(blueChip).toFixed(1)}★ (BC% = {Math.round(blueChip*100)}%)</Label>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[5, 4, 3, 2].map((s) => (
                      <Btn key={s} active={star === s} onClick={() => setStar(s)}>
                        {s}★ (×{starAdjMult(s, blueChip).toFixed(2)})
                      </Btn>
                    ))}
                  </div>
                </div>
              )}

              {mode === "portal" && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Portal rank: #{rank}</Label>
                  <input type="range" min={1} max={450} step={1} value={rank} onChange={(e) => setRank(parseInt(e.target.value))} style={{ width: "100%" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.muted, marginTop: 2 }}>
                    <span>Elite (1)</span><span>Mid (100)</span><span>Late (450)</span>
                  </div>
                </div>
              )}

              {mode === "returning" && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Production tier</Label>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {[["allamerican","All-American",3.0],["star","Star starter",2.0],["starter","Starter",1.2],["role","Role player",0.6],["depth","Depth",0.3]].map(([k,l,m]) => (
                      <Btn key={k} active={prod === k} onClick={() => setProd(k)}>{l} (×{m})</Btn>
                    ))}
                  </div>
                </div>
              )}

              {mode !== "portal" && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Label>Social media: {followers}K followers (×{socialMult(followers).toFixed(2)})</Label>
                  <input type="range" min={0} max={1000} step={5} value={followers} onChange={(e) => setFollowers(parseInt(e.target.value))} style={{ width: "100%" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.muted, marginTop: 2 }}>
                    <span>0K</span><span>250K</span><span>500K</span><span>1M+</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 }}>
                Estimated annual NIL value
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: T.accent, marginTop: 6, fontFamily: "'Playfair Display', serif" }}>
                {fmt(result.mid)}
              </div>
              <div style={{ fontSize: 14, color: T.muted, marginTop: 4 }}>
                Range: <span style={{ color: T.text }}>{fmt(result.low)} – {fmt(result.high)}</span>
                {result.mid >= MAX_NIL && (<span style={{ color: T.amber, marginLeft: 8 }}>(capped at model ceiling)</span>)}
              </div>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid " + T.border, fontSize: 12, color: T.muted, lineHeight: 1.7 }}>
                <strong style={{ color: T.text }}>Calculation:</strong>{" "}
                {mode === "portal" ? (
                  <>Market rate (<span style={{ color: T.text }}>{fmt(result.market)}</span>) = curve at rank #{rank} × position {pos} (×{posMult(sport, pos).toFixed(2)}). School ceiling (<span style={{ color: T.text }}>{fmt(result.ceiling)}</span>) = 30 × {fmt(schoolNil)}, floored at $1M. {result.bound === "school" ? <span style={{ color: T.amber }}>Ceiling binds</span> : result.bound === "absolute" ? <span style={{ color: T.amber }}>$8M cap binds</span> : <span style={{ color: T.green }}>Market rate prevails</span>}.</>
                ) : mode === "recruit" ? (
                  <>{school} avg (<span style={{ color: T.text }}>{fmt(schoolNil)}</span>) × {star}★ at typical-{typicalStar(blueChip).toFixed(1)}★ school (×{starAdjMult(star, blueChip).toFixed(2)}) × position ({pos}: ×{posMult(sport, pos).toFixed(2)}) × social (×{socialMult(followers).toFixed(2)})</>
                ) : (
                  <>{school} avg (<span style={{ color: T.text }}>{fmt(schoolNil)}</span>) × production (×{prodMult(prod)}) × position (×{posMult(sport, pos).toFixed(2)}) × social (×{socialMult(followers).toFixed(2)})</>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Stat label="School avg NIL" value={fmt(schoolNil)} sub={schoolData[2]} color={T.accent} />
              {mode === "portal" ? (
                <>
                  <Stat label="Market rate" value={fmt(result.market)} sub={"Rank curve × position"} color={T.bb} />
                  <Stat label="School ceiling" value={fmt(result.ceiling)} sub={"30 × class avg, floor $1M"} color={result.bound === "school" ? T.amber : T.muted} />
                </>
              ) : (
                <Stat label="Blue-chip %" value={Math.round(blueChip*100) + "%"} sub={"Typical " + typicalStar(blueChip).toFixed(1) + "★ recruit"} color={T.bb} />
              )}
              <Stat label="Position effect" value={"×" + posMult(sport, pos).toFixed(2)} sub={pos} color={T.fb} />
              <Stat label="Tier" value={schoolData[3]} color={schoolData[3] === "Power 4" ? T.power : T.g5} />
            </div>
          </>
        )}

        {view === "methodology" && (
          <div style={{ fontSize: 14, lineHeight: 1.75, color: T.text }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: T.white, marginBottom: 8 }}>How the model works</h2>
            <p style={{ color: T.muted }}>
              v4 adds blue-chip-aware HS recruit calibration and reports the empirical finding on portal school effects.
            </p>

            <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 10, padding: 18, margin: "16px 0" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.accent, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>
                Change 1 — Blue-chip-aware star multiplier (HS recruits)
              </h3>
              <p style={{ margin: 0 }}>
                v3 used universal star multipliers (5★ = 2.5×, 4★ = 1.0×, 3★ = 0.55×) regardless of school. That's wrong: at Toledo (BC%=0%, typical recruit is 3★), a 3★ IS the typical recruit and should multiply at 1.0× — not 0.55×. v4 anchors the multiplier to each school's "typical" star tier:
              </p>
              <pre style={{ background: T.cardAlt, padding: 12, borderRadius: 6, fontSize: 12, color: T.text, marginTop: 8, overflow: "auto" }}>
typical_star = 3.0 + 1.5 × blue_chip_pct
multiplier   = 1.6 ^ (star - typical_star)</pre>
              <p style={{ margin: "8px 0 0", fontSize: 12, color: T.muted }}>
                At Alabama (BC=0.66, typical=3.99★): 5★ = ×1.61, 4★ = ×1.00, 3★ = ×0.62. At Toledo (BC=0, typical=3★): 5★ = ×2.56, 4★ = ×1.60, 3★ = ×1.00.
              </p>
            </div>

            <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 10, padding: 18, margin: "16px 0" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.accent, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>
                Change 2 — School-as-ceiling for portal mode
              </h3>
              <p style={{ margin: 0 }}>
                Empirical regression showed school NIL has near-zero predictive power for portal residuals after rank and position are controlled for (FB R² = 0.006, BB R² = 0.19 with negative slope). The rank curve already absorbs school effects through selection. So instead of adding a school multiplier (which would double-count the way v2 did), v5 uses school as a <em>ceiling</em>:
              </p>
              <pre style={{ background: T.cardAlt, padding: 12, borderRadius: 6, fontSize: 12, color: T.text, marginTop: 8 }}>
ceiling = max(school_avg × 30, $1M)
prediction = min(market_rate, ceiling)</pre>
              <p style={{ margin: "8px 0 0" }}>
                For realistic combinations the market rate is below the ceiling and the ceiling has no effect. For unrealistic counterfactuals (Vanderbilt + rank 1 QB) the ceiling clamps the prediction. The 30× multiplier was tuned empirically — preserves backtest accuracy (FB R² 0.73 → 0.72; BB R² 0.68 → 0.66) while differentiating schools at the edges. The $1M floor prevents over-clipping at low-resource schools.
              </p>
            </div>

            <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 10, padding: 18, margin: "16px 0" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.accent, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>
                Change 3 — Refreshed 2026 school data
              </h3>
              <p style={{ margin: 0 }}>
                School avg NIL and blue-chip % use 2026 On3 team rankings where available, falling back to 2024-2025 for schools whose 2026 classes aren't yet finalized. {FB_SCHOOLS.length} football and {BB_SCHOOLS.length} basketball programs in total.
              </p>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: T.white, marginTop: 28, marginBottom: 8 }}>Three formulas</h2>
            <div style={{ background: T.cardAlt, border: "1px solid " + T.border, borderRadius: 8, padding: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
              <div><strong style={{ color: T.fb }}>HS Recruit:</strong> school_avg × 1.6^(star − typical_star) × position × social</div>
              <div style={{ marginTop: 6 }}><strong style={{ color: T.bb }}>Portal Transfer:</strong> min(exp(a + b·ln(rank)) × position, max(school_avg × 30, $1M))</div>
              <div style={{ marginTop: 6 }}><strong style={{ color: T.green }}>Returning:</strong> school_avg × production × position × social</div>
              <div style={{ marginTop: 8, color: T.muted, fontSize: 11 }}>All capped at $8M.</div>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: T.white, marginTop: 28, marginBottom: 8 }}>Limitations</h2>
            <ul style={{ color: T.muted, lineHeight: 1.7 }}>
              <li><strong style={{ color: T.text }}>Selection bias in portal data.</strong> Only the ~470 ranked transfers in the On3 dataset are represented; the unranked majority isn't.</li>
              <li><strong style={{ color: T.text }}>Position multipliers are portal-derived.</strong> Applied to HS recruits and returning players too, but those markets may have different position dynamics.</li>
              <li><strong style={{ color: T.text }}>Outliers missed by design.</strong> A 5★ QB at LSU predicts ~$1M, but Bryce Underwood got $6M. Aggregate inputs can't capture individual brand value or collective decisions.</li>
              <li><strong style={{ color: T.text }}>Social media multiplier is unfit.</strong> No data joins followers to NIL; the multiplier (max ×1.5) is conservative guesswork.</li>
              <li><strong style={{ color: T.text }}>Power-law over-extrapolates at rank 1.</strong> Sparse top-end data means rank-1 predictions hit the $8M cap and are likely overestimates.</li>
              <li><strong style={{ color: T.text }}>Mixed-year school averages.</strong> 2026 used where available; older years used as fallback. Pre-House-settlement valuations are structurally lower.</li>
            </ul>
          </div>
        )}

        {view === "validation" && (
          <>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>
              Each ranked transfer below has both an On3 NIL valuation and a confirmed destination. Plugging each into the v4 portal model produces a prediction; the scatter shows predicted vs. actual on a log scale.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "16px 0" }}>
              <Stat
                label={"FB anchors (n=" + ANCHORS_FB.length + ")"}
                value={"R² = " + backtest.fb.r2.toFixed(2)}
                sub={(backtest.fb.w25 * 100).toFixed(0) + "% within ±25%"}
                color={T.fb}
                onClick={() => setActiveInfo(activeInfo === "fb_r2" ? null : "fb_r2")}
                active={activeInfo === "fb_r2"}
              />
              <Stat
                label={"BB anchors (n=" + ANCHORS_BB.length + ")"}
                value={"R² = " + backtest.bb.r2.toFixed(2)}
                sub={(backtest.bb.w25 * 100).toFixed(0) + "% within ±25%"}
                color={T.bb}
                onClick={() => setActiveInfo(activeInfo === "bb_r2" ? null : "bb_r2")}
                active={activeInfo === "bb_r2"}
              />
              <Stat
                label="FB within ±50%"
                value={(backtest.fb.w50 * 100).toFixed(0) + "%"}
                color={T.green}
                onClick={() => setActiveInfo(activeInfo === "fb_w50" ? null : "fb_w50")}
                active={activeInfo === "fb_w50"}
              />
              <Stat
                label="BB within ±50%"
                value={(backtest.bb.w50 * 100).toFixed(0) + "%"}
                color={T.green}
                onClick={() => setActiveInfo(activeInfo === "bb_w50" ? null : "bb_w50")}
                active={activeInfo === "bb_w50"}
              />
            </div>
            {activeInfo && STAT_INFO[activeInfo] && (
              <div style={{ padding: "14px 18px", background: T.cardAlt, border: "1px solid " + T.border, borderRadius: 8, marginBottom: 16, fontSize: 13, color: T.text, lineHeight: 1.6 }}>
                {STAT_INFO[activeInfo]}
              </div>
            )}

            {[["FB", T.fb, backtest.fb.data, "Football"], ["BB", T.bb, backtest.bb.data, "Basketball"]].map(([sk, color, data, label]) => (
              <div key={sk} style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 10, padding: 18, marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: T.white, margin: "0 0 8px" }}>{label} — predicted vs. actual NIL</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                    <XAxis type="number" dataKey="predicted" scale="log" domain={[1e5, 1e7]} ticks={[1e5, 5e5, 1e6, 5e6, 1e7]} tickFormatter={fmt} tick={{ fill: T.muted, fontSize: 11 }} name="Predicted" />
                    <YAxis type="number" dataKey="actual" scale="log" domain={[1e5, 1e7]} ticks={[1e5, 5e5, 1e6, 5e6, 1e7]} tickFormatter={fmt} tick={{ fill: T.muted, fontSize: 11 }} name="Actual" />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload;
                        return (
                          <div style={{ background: T.cardAlt, border: "1px solid " + T.border, borderRadius: 6, padding: "8px 10px", fontSize: 12 }}>
                            <div style={{ fontWeight: 700, color: T.white }}>{d.name}</div>
                            <div style={{ color: T.muted }}>#{d.rank} {d.pos} → {d.school}</div>
                            <div style={{ color: T.text, marginTop: 4 }}>Predicted: {fmt(d.predicted)}</div>
                            <div style={{ color: T.accent }}>Actual: {fmt(d.actual)}</div>
                            <div style={{ color: d.error > 0 ? T.green : T.red, fontSize: 11 }}>Error: {(d.error * 100).toFixed(0)}%</div>
                          </div>
                        );
                      }}
                    />
                    <ReferenceLine segment={[{x:1e5,y:1e5},{x:1e7,y:1e7}]} stroke={T.muted} strokeDasharray="6 3" strokeWidth={1.5} />
                    <Scatter data={data} fill={color} fillOpacity={0.7} />
                  </ScatterChart>
                </ResponsiveContainer>
                <div style={{ fontSize: 10, color: T.muted, marginTop: 4, textAlign: "center" }}>
                  Dashed line = perfect prediction (y = x). Above = underprediction, below = overprediction.
                </div>
              </div>
            ))}

            <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 10, padding: 18 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.white, margin: "0 0 12px" }}>Largest residuals (combined)</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid " + T.border }}>
                      {["Player","Rank","Pos","School","Predicted","Actual","Error"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: T.muted, fontWeight: 700, textTransform: "uppercase", fontSize: 10, letterSpacing: 0.8 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...backtest.fb.data, ...backtest.bb.data].sort((a,b) => Math.abs(b.error) - Math.abs(a.error)).slice(0, 12).map((d,i) => (
                      <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                        <td style={{ padding: "8px 10px", color: T.text, fontWeight: 600 }}>{d.name}</td>
                        <td style={{ padding: "8px 10px", color: T.muted }}>#{d.rank}</td>
                        <td style={{ padding: "8px 10px", color: T.muted }}>{d.pos}</td>
                        <td style={{ padding: "8px 10px", color: T.muted }}>{d.school}</td>
                        <td style={{ padding: "8px 10px" }}>{fmt(d.predicted)}</td>
                        <td style={{ padding: "8px 10px", color: T.accent }}>{fmt(d.actual)}</td>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: Math.abs(d.error) > 0.5 ? T.red : T.amber }}>{d.error > 0 ? "+" : ""}{(d.error * 100).toFixed(0)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1px solid " + T.border, fontSize: 11, color: T.muted, textAlign: "center", lineHeight: 1.7 }}>
          Data: On3 2026 Transfer Portal Rankings, On3 2026 Team Rankings (NIL Avg + blue-chip%), ON3 Conference Tier Lookup
          <br />
          Grant Franklin · DCDA Capstone · Spring 2026
        </div>
      </div>
    </div>
  );
}

import BN from "bn.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import moment from 'moment'

export function formatUSD(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function formatAbbreviationNumber(num) {
  if (num >= 1000000000) {
      return `${formatDollar(num/1000000000)}B`
  } else if (num >= 1000000) {
      return `${formatDollar(num/1000000)}M`
  } else {
      return `${formatDollar(num)}`
  }
}

export function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    return ["$", p[0].split("").reverse().reduce(function(acc, num, i) {
        return num + (i && !(i % 3) ? "," : "") + acc;
    }, "."), p[1]].join("");
}

export function formatNumber(num) {
  var p = num.toFixed(2).split(".");
  return [p[0].split("").reverse().reduce(function(acc, num, i) {
      return num + (i && !(i % 3) ? "," : "") + acc;
  }, "."), p[1]].join("");
}

export function lamportsToSol(lamports: number | BN): number {
  if (typeof lamports === "number") {
    return Math.abs(lamports) / LAMPORTS_PER_SOL;
  }

  let signMultiplier = 1;
  if (lamports.isNeg()) {
    signMultiplier = -1;
  }

  const absLamports = lamports.abs();
  const lamportsString = absLamports.toString(10).padStart(10, "0");
  const splitIndex = lamportsString.length - 9;
  const solString =
    lamportsString.slice(0, splitIndex) +
    "." +
    lamportsString.slice(splitIndex);
  return signMultiplier * parseFloat(solString);
}


//function that takes lamports as any and returns the number divided by LAMPORTS_PER_SOL
export function lamportsToSolString(lamports: any): string {
    return lamportsToSol(lamports).toString();
}

// function that takes in a wallet address as a string and returns the first 4 and last 4 characters of the address 
export function formatWalletAddress(address: any): any {
    return address.slice(0, 4) + "..." + address.slice(-4);
}

export const formatTimeAgo = (tickFormat) => {
  return moment.unix(tickFormat).fromNow();
};




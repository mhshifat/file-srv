export default function convertHMSToString({ hours, minutes, seconds }:{ hours: number, minutes: number, seconds: number }) {  
  return `${String(hours).padStart(2, '0')}-${String(minutes).padStart(2, '0')}-${String(seconds).padStart(2, '0')}`
}
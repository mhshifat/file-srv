export default function extractFunctionsFormObj<TObj extends object>(obj: TObj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key as keyof typeof obj] === 'function') {
      acc[key as keyof typeof obj] = obj[key as keyof typeof obj];
    }
    return acc;
  }, {} as Partial<typeof obj>)
}
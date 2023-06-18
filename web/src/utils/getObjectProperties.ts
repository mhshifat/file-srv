export default function getObjectProperties<T>(obj: T, prefix = ''): string[] {  
  const properties: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let property = prefix ? `${prefix}.${key}` : key;
      if (prefix.endsWith(']') && key.length === 1 && Number.isInteger(Number(key))) property = prefix;
      if (Array.isArray(obj[key])) {
        const arrayKey = obj[key] as object[];
        if (!arrayKey.length) properties.push(property);
        else {
          const nestedArrayProperties = arrayKey.flatMap((item: unknown, index: number) =>
            getObjectProperties({ [index]: item }, `${property}[${index}]`)
          );
          properties.push(...nestedArrayProperties);
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        const nestedProperties = getObjectProperties(obj[key], property);
        properties.push(...nestedProperties);
      } else {
        properties.push(property);
      }
    }
  }

  return properties;
}
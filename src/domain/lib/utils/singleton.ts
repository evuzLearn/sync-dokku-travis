const instances = new Map<string, any>();

export function generateSingleton(singleton, ...params) {
  const instance = instances.get(singleton.name);
  if (instance) {
    return instance;
  }
  const object = new singleton(...params);
  instances.set(singleton.name, object);
  return object;
}

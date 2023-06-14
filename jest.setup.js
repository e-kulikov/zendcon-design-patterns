(function () {
    const proxyInstances = new WeakSet()

    const OriginalProxy = Proxy

    Proxy = new Proxy(Proxy, {
        construct(target, args) {
            const newProxy = new OriginalProxy(...args)
            proxyInstances.add(newProxy)
            return newProxy
        },
        get(obj, prop, ...rest) {
            if (prop === Symbol.hasInstance) {
                return (instance) => {
                    return proxyInstances.has(instance)
                }
            }
            return Reflect.get(obj, prop, ...rest);
        }
    })
})();

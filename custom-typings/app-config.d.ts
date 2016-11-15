declare module App {
    enum Environment {
        PRODUCTION,
        DEVELOPMENT
    }


    interface Config {
        environment: Environment
        mongoConnectionUrl: string
    }
}
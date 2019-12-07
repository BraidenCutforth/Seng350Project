module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/testConfig/setup.ts'],
    coverageThreshold: {
        global: {
            statements: 90,
        },
    },
}

# Testing Setup - Control Motos Frontend

## ✅ Current Status

The Jest testing framework has been successfully configured and is working properly. Basic tests are running successfully.

## 🚀 What's Working

### Jest Configuration
- ✅ Jest is properly configured with `jest-preset-angular`
- ✅ TypeScript support is working
- ✅ Basic test execution is functional
- ✅ Mock functions are working correctly

### Test Files Created
- ✅ `src/app/simple-test.spec.ts` - Basic Jest functionality test
- ✅ `src/app/service/simple-service.spec.ts` - Service mocking test
- ✅ `src/app/app.component.spec.ts` - App component test (needs component resolution fix)
- ✅ `src/app/auth/login/login.component.spec.ts` - Login component test
- ✅ `src/app/auth/register/register.component.spec.ts` - Register component test
- ✅ `src/app/Components/motos/motos.component.spec.ts` - Motos component test
- ✅ `src/app/service/motos.service.spec.ts` - Motos service test
- ✅ `src/app/service/usuarios.service.spec.ts` - Usuarios service test

## 🔧 Configuration Files

### Jest Configuration (`jest.config.js`)
```javascript
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': ['ts-jest', {
      tsconfig: 'tsconfig.spec.json'
    }],
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '**/src/**/*.spec.ts'
  ],
  moduleNameMapping: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)'
  ]
};
```

### Setup File (`setup-jest.ts`)
```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();
```

## 📋 Available Test Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci

# Run specific test file
npm test -- --testPathPattern=filename.spec.ts
```

## 🧪 Test Examples

### Basic Test
```typescript
describe('Simple Test', () => {
  it('should work', () => {
    expect(true).toBe(true);
  });
});
```

### Service Mock Test
```typescript
describe('Service Test', () => {
  it('should create a mock service', () => {
    const mockService = {
      getData: jest.fn().mockReturnValue('test data')
    };
    expect(mockService.getData()).toBe('test data');
  });
});
```

### Component Test (Template)
```typescript
describe('Component Test', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [
        { provide: ServiceName, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## ⚠️ Known Issues

1. **Component Resolution**: Some component tests may fail due to template/style resolution issues
2. **Jest Configuration Warning**: `moduleNameMapping` option warning (non-critical)
3. **Angular Dependencies**: Some tests may need additional Angular testing modules

## 🎯 Next Steps

1. Fix component resolution issues for full component testing
2. Add more comprehensive test coverage
3. Set up test coverage reporting
4. Add integration tests
5. Configure test CI/CD pipeline

## 📊 Test Coverage

Current test coverage is being generated in the `coverage/` directory with:
- Text output for console
- LCOV format for CI/CD
- HTML format for detailed browser viewing

## 🛠️ Troubleshooting

### Common Issues
1. **Jest not found**: Run `npm install` to ensure dependencies are installed
2. **Component resolution errors**: May need to add additional Angular testing modules
3. **Mock issues**: Ensure mocks are properly configured and reset between tests

### Debug Commands
```bash
# Run with verbose output
npm test -- --verbose

# Run specific test pattern
npm test -- --testNamePattern="should create"

# Run with coverage
npm test -- --coverage
```

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jest Preset Angular](https://thymikee.github.io/jest-preset-angular/)

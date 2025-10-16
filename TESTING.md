# Testing Guide

This project uses Jest for unit testing with Angular testing utilities.

## Test Structure

The tests are organized as follows:
- **Component Tests**: Test Angular components in isolation
- **Service Tests**: Test services with mocked HTTP calls
- **Integration Tests**: Test component-service interactions

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD (no watch mode, with coverage)
npm run test:ci
```

### Test Files

All test files follow the pattern `*.spec.ts` and are located alongside their source files:

- `src/app/app.component.spec.ts` - Main app component tests
- `src/app/auth/login/login.component.spec.ts` - Login component tests
- `src/app/auth/register/register.component.spec.ts` - Register component tests
- `src/app/Components/motos/motos.component.spec.ts` - Motos component tests
- `src/app/service/motos.service.spec.ts` - Motos service tests
- `src/app/service/usuarios.service.spec.ts` - Usuarios service tests

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Uses `jest-preset-angular` for Angular-specific testing utilities
- Configured for TypeScript and HTML templates
- Includes coverage reporting
- Uses jsdom environment for DOM testing

### Test Setup (`setup-jest.ts` and `src/test-setup.ts`)
- Configures Zone.js for Angular testing
- Mocks browser APIs like `alert` and `confirm`
- Sets up global test utilities

## Writing Tests

### Component Testing

```typescript
describe('ComponentName', () => {
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

### Service Testing

```typescript
describe('ServiceName', () => {
  let service: ServiceName;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceName]
    });
    service = TestBed.inject(ServiceName);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
```

## Test Coverage

The project is configured to generate coverage reports in multiple formats:
- **Text**: Console output
- **LCOV**: For CI/CD integration
- **HTML**: Detailed browser-viewable report

Coverage reports are generated in the `coverage/` directory.

## Best Practices

1. **Test Isolation**: Each test should be independent and not rely on other tests
2. **Mock Dependencies**: Use spies and mocks for external dependencies
3. **Test Behavior**: Focus on testing behavior rather than implementation details
4. **Descriptive Names**: Use clear, descriptive test names
5. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification phases

## Common Patterns

### Testing HTTP Services
```typescript
it('should make HTTP request', () => {
  service.getData().subscribe(data => {
    expect(data).toEqual(mockData);
  });

  const req = httpMock.expectOne('api/endpoint');
  expect(req.request.method).toBe('GET');
  req.flush(mockData);
});
```

### Testing Component Methods
```typescript
it('should call service method', () => {
  spyOn(service, 'methodName');
  component.onAction();
  expect(service.methodName).toHaveBeenCalled();
});
```

### Testing DOM Elements
```typescript
it('should render element', () => {
  fixture.detectChanges();
  const element = fixture.debugElement.query(By.css('.class-name'));
  expect(element).toBeTruthy();
});
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all necessary modules are imported in test configuration
2. **Async Issues**: Use `async`/`await` or `fakeAsync`/`tick` for async operations
3. **Change Detection**: Call `fixture.detectChanges()` after making changes
4. **Mock Issues**: Verify mocks are properly configured and reset between tests

### Debugging Tests

```bash
# Run specific test file
npm test -- --testPathPattern=component-name.spec.ts

# Run tests with verbose output
npm test -- --verbose

# Run tests matching pattern
npm test -- --testNamePattern="should create"
```


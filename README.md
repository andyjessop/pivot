# Pivot

[![ci](https://github.com/andyjessop/pivot/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/andyjessop/pivot/actions/workflows/ci.yml)

Pivot is a tool for managing deployment of your projects. It is also a framework for building application code in a way that is fast, easy to test, and maintainable.

In the new paradigm of AI-driven development, it is important to make it easy for AI helpers to understand your code. Pivot decouples state updates from services from business logic, giving AI helpers a clear path to hyper-rapid development.

## Motivation

The motivation behind this modular service management framework is to simplify the development, maintenance, and testing of complex web applications by offering a structured and organized way to manage services, state, and dependencies. Key motivations include:

1. **Modularity**: The framework encourages a modular approach to application development. By defining services and slices in a consistent and organized manner, it becomes easier to separate concerns and promote reusability of components across the application.

2. **Dependency Injection**: The injectable system allows developers to manage dependencies explicitly, making it easier to understand the relationships between components. This approach promotes loose coupling and enhances testability by enabling developers to replace dependencies with mocks or stubs during testing.

3. **Scalability**: The framework's structure makes it easier to add new services, slices, and dependencies as the application grows, reducing the complexity that comes with larger applications.

4. **Application-First, UI-Independent Design**: The framework is designed to be application-first and independent of the UI, enabling the entire app to run without a user interface. It is state-driven, which means that the UI is always a representation of the state. This design approach minimizes the need for useState and useEffect, simplifying the overall development process and allowing developers to focus on application logic.

5. **Ease of Testing**: This framework is designed with testing as a first-class citizen. Integration tests can be performed using Jest, Vitest, or other testing tools, and can be debugged in the IDE without needing a UI. This design choice allows developers to focus on application logic and correctness before implementing the user interface.

Overall, the motivation behind this framework is to provide developers with a toolset that streamlines the development process, enhances maintainability, and improves testability of web applications by introducing a well-defined structure for managing services, state, and dependencies.

## Architecture

The architecture of the modular service management framework is centered around the concepts of services, slices, and dependency injection. This design allows developers to create a well-structured, scalable, and testable web application. The main components of the framework's architecture are:

1. **Injectable**: Injectable objects are at the core of the framework. They are created using the injectable higher-order function, which takes an object containing an importFn and dependencies. The importFn is responsible for initializing the service or slice, while the dependencies array lists other services or slices required for the injectable object to function. Injectable objects are lazily-loaded by default, meaning that the application is kept lightweight by only loading the injectable objects that are needed at any given time.

2. **Services**: Services are responsible for handling the application's business logic and interactions with external systems, such as APIs or databases. They are defined as injectable objects, with their dependencies explicitly declared. Services can depend on other services or slices to perform their tasks.

3. **Slices**: Slices represent the application's state management units. They are also defined as injectable objects, with their dependencies explicitly listed. Slices are used to manage and update the state of the application in a modular and organized manner. Slices are dynamically loaded and unloaded as needed, which helps keep the application lightweight.

4. **Subscriptions**: Subscriptions are mechanisms that allow developers to react to changes in the application's state. They enable you to listen for specific state updates and execute side effects or other actions in response to these updates. Subscriptions help you manage and respond to state changes in a more organized and efficient manner. They are often used for business logic that crosses module boundaries.

5. **Application Initialization**: The headless function initializes the application by taking services, slices, and subscriptions as arguments. It sets up the application's state management and service instances, taking care of their dependencies and ensuring a proper initialization order.

6. **Custom Hooks**: The framework provides custom hooks, such as useService and useSelector, which are created using the createUseService and createUseSelector factory functions. These hooks allow developers to easily access services and state within their components.

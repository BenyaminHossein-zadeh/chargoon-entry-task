# Chargoon Entry Challenge

This project is an entry test for Chargoone Team, The task involves managing an organizational chart and hierarchy, utilizing trees and nodes to represent the structure of an organization.
<a name="unique-anchor-name">test</a>

### project base repository

task was based on this github repo: (https://github.com/arminyahya/chargoon-challenge-entry)

### Constraints:

- No Additional Packages: The project must be completed without adding any additional packages or dependencies beyond those already provided in the cloned repository.
- Task Duration: The project has a completion deadline of 4 days, started on: Wed, Feb 5, 11:18 AM.

---

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Project Structure Overview](#project-structure-overview)
- [Key Features](#key-features)
- [Extra Works](#extra-works)
- [My Tasks](#my-tasks)
  - [Task 1: Node Deletion](#task-1-node-deletion)
  - [Task 2: Node Cut and Paste](#task-2-node-cut-and-paste)
  - [Task 3: Adding Subtree & Table Management](#task-3-adding-subtree-table-management)
  - [Task 4: Search and Node Positioning](#task-4-search-and-node-positioning)
- [Technologies Used](#technologies-used)

---

## Installation

To install the project dependencies, run:

### `yarn install`

In the project directory, you can run:

### `yarn start`

this runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```plaintext
chargoon-challenge-entry/
├── .gitignore
├──📁 .vscode/
│   └── settings.json
├── package.json
├──📁 public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├──📁 src/
│   ├── App.tsx
│   ├── appContext.tsx
│   ├──📁 Components/
│   │   ├──📁 ActionBar/
│   │   │   └── index.tsx
│   │   ├──📁 ContextMenu/
│   │   │   └── index.tsx
│   │   ├──📁 Form/
│   │   │   ├── accesses.tsx
│   │   │   ├── basic-information.tsx
│   │   │   ├── index.tsx
│   │   │   └── user-autocomplete.tsx
│   │   ├──📁 Modal/
│   │   │   └── index.tsx
│   │   ├──📁 Sidebar/
│   │   │   └── index.tsx
│   │   ├──📁 SvgIcons/
│   │   │   ├── arrow-down.tsx
│   │   │   ├── arrow-up.tsx
│   │   │   └── orgchart.tsx
│   │   ├──📁 Table/
│   │   │   ├── index.tsx
│   │   │   ├── TableHead.tsx
│   │   │   ├── TableRow.tsx
│   │   │   └── table.css
│   │   ├──📁 Tree/
│   │   │   ├── index.tsx
│   │   │   ├── MiniTree.tsx
│   │   │   ├── node.tsx
│   │   │   └── searchResult.tsx
│   ├──📁 core/
│   │   ├──📁 services/
│   │   │   ├── index.ts
│   │   │   ├── mockData.ts
│   │   │   └── transportLayer.ts
│   │   ├──📁 store/
│   │   │   ├── TreeProvider.tsx
│   │   │   ├── functions.ts
│   │   │   └──📁 hooks/
│   │   │       └── useTree.ts
│   │   ├──📁 types/
│   │   │   └── types.ts
│   ├── ErrorBoundry.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
└── tsconfig.json
```

# Project Structure Overview

## **`src/`**

The `src` directory contains the actual application code, including React components, context providers, services, and other utilities.

### Main Files:

- **`App.tsx`**: The root component that wraps the entire application. It's the starting point for rendering all components.
- **`appContext.tsx`**: The context provider that handles global state and passes it to child components.

### Components:

- **`ActionBar/`**, **`ContextMenu/`**, **`Form/`**, **`Modal/`**, **`Sidebar/`**, **`SvgIcons/`**, **`Table/`**, **`Tree/`**: These folders contain reusable UI components used throughout the app. Each folder typically contains an `index.tsx` file for the main component and possibly additional subcomponents or files for styling and logic.
  - For example, `Form/` contains various form components such as `accesses.tsx`, `basic-information.tsx`, and `user-autocomplete.tsx`.

### Core Logic:

- **`core/`**: Contains core logic files, such as constants, helper functions, services, store, and types.
  - **`services/`**: Includes files for API calls and data management. Files like `transportLayer.ts` handle communication with external APIs.
  - **`store/`**: Manages the application's state, including `TreeProvider.tsx` for providing state to components and custom hooks like `useTree.ts`.
  - **`types/`**: TypeScript definitions and types used throughout the app. Files like `types.ts` define types for components, services, etc.

### Miscellaneous:

- **`ErrorBoundry.tsx`**: A component to catch JavaScript errors in the application and display fallback UI.
- **`index.css`**: Global CSS styles for the app.
- **`index.tsx`**: The entry point for rendering the root React component (`App.tsx`) into the DOM.
- **`react-app-env.d.ts`**: TypeScript declaration file that provides type definitions for environment variables.
- **`reportWebVitals.ts`**: Contains code for measuring performance metrics of the app, typically used for tracking web vitals like page load speed.
- **`setupTests.ts`**: Configuration file for setting up testing environments using libraries like Jest or React Testing Library.

---

### Key Features:

- Tree structure representing employee roles.
- Right-click context menu for node management.
- Dynamic form handling for adding and editing nodes.
- Search functionality for filtering nodes.

### Extra works:

- Providing a key when adding a subnode. it chan be any string not only numbers.
- Adding validation to the forms to prevent adding bad data to tree.
- Detecting if entered key is duplicated and suggesting an appropriate key.
- lots of other minor improvements that may affect user experience.

### keep in mind:

- some naming conventions was not proper for example using camlecase for file and variable alongside with pascalcase is not ok but i try to keep my work crean and contant as much as possible and not make any major change to base projects structures.

---

## My Tasks ( done = ✅ )

### Task 1: Node Deletion ✅

Implement the functionality to delete a node from the tree when the user right-clicks on it and selects the **Delete** option from the context menu. The following conditions should be met:

- The node should be deleted only if it has no children (leaf node).
- Implement the necessary error handling for invalid actions.

### Task 2: Node Cut and Paste ✅

Allow users to cut and paste nodes within the tree. The conditions are:

- **Cut** should only be available for nodes with children.
- After cutting, the user can paste the node under a different parent node.
- The node should be moved, not copied.

### Task 3: Adding Subtree & Table Management ✅

#### Task 3-1: Add Subtree Form ✅

Implement a form to add a new child node under a selected node. The form should include the following:

- Title input for the node name.
- A **Save** button to store the new node.

#### Task 3-2: Add Table in Main Info Tab ✅

Create a custom table in the main info tab with the following:

- Three columns: **Operation**, **Default**, **Code**.
- The **Operation** column should have a button to open a delete menu (use Ant Design's `Popover`).
- The **Default** column should contain checkboxes for marking default users (only one user can be marked as default).
- The **Code** column should display a static text representing the user code.

#### Task 3-3: Add Node to Tree ✅

Allow the user to add a new node as a child to a selected node:

- When the user clicks **Add Subtree** and fills in the form, the new node should be added as a child of the selected node.

#### Task 3-4: Save and Load Data ✅

Ensure that the node data is saved and loaded correctly after the user clicks **Save**:

- The data entered in the form should be stored in the context and loaded into the form fields when selecting a node.

### Task 4: Search and Node Positioning ✅

#### Task 4-1: Search Functionality ✅

Implement a search box that filters nodes by name. Display the search results in a collapsible list below the tree.

#### Task 4-2: Display Node Position ✅

When a node is selected from the search results, show its position in the tree (its parent and ancestors) using a popover.

---

## Technologies Used

- **React.js**
- **TypeScript**
- **Ant Design**
- **Context API** : for global state management

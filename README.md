# SourceUp Automation (Cypress)

**Automated end-to-end testing for [acc.sourceup.org](https://acc.sourceup.org) using Cypress**

---

## Table of Contents
- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Running Tests](#running-tests)   
- [Contributing](#contributing)  
- [License](#license)

---

## Overview
This project contains **Cypress E2E tests** to validate the key user flows and functionality of the SourceUp platform at **acc.sourceup.org**.  
It ensures that core features such as navigation, search, login, and initiatives display work as expected after deployments or updates.

---

## Features
- **Cypress-powered automation** for browser-based tests  
- Validates **public pages** (Home, Initiatives, Organizations, How It Works, etc.)  
- Tests **login and registration flows**  
- Checks **content rendering** for initiatives and partner profiles  
- Runs locally or in CI (GitHub Actions ready)  

---

## Tech Stack
- [Cypress](https://www.cypress.io/) — UI & functional testing  
- Node.js — runtime for Cypress  
- GitHub Actions — CI/CD automation (optional)  

---

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/alfakiisa/SourceUp-Project.git
cd SourceUp-Project

### 2. Install Dependies
-npm Install

### 3. Running Tests
- npx cypress open
# PlexiCore
Build powerful server-driven applications with ease | PlexiCoreJS

### Get Started
 - [Installation](#installation)
 - [Basic Usage](#basic-usage)

### Installation
Install with NPM
```bash
npm install https://github.com/AxeriDev/PlexiCore.git
```

### Basic Usage
Lets get started by creating a simple CLI animation and deivider
We always recommend using **TypeScript**

```typescript
    import PlexiCore from "@axeridev/plexi-core";
    
    // Construct PlexiCore
    const plexiCore = new PlexiCore();
    
    // Create a divider
    plexiCore.terminal.dividerCreate("Hello, PlexiCore");
    
    // Create a spinner animation
    plexiCore.terminal.writeSpinner("Hello, PlexiCore Terminal Anime");
```

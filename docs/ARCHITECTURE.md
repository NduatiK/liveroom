# Architecture

> [!IMPORTANT]  
> This is a work in progress.

```mermaid
graph TD
    subgraph Front
      subgraph Google Meet
        ChromeExtension(Chrome extension)
      end

      subgraph Liveroom.app
        Admin(LiveView)
      end

      subgraph Any website
        Client(Custom HTML Element)
      end
    end

    subgraph Liveroom Server
      ClientProcess_1
      ClientProcess_2
      AdminProcess
    end

    ChromeExtension <-- LiveState --> ClientProcess_1
    Client <-- LiveState --> ClientProcess_2
    Admin <-- LiveView --> AdminProcess
```

**ClientProcess** & **AdminProcess** communicate with each other over PubSub (can't draw it properly on the Mermaid graph), on a particular **room** (topic).

The HTML Custom Element allows Liveroom to be plug-and-play on any SaaS product easily.

# Architecture

> [!IMPORTANT]  
> This is a work in progress.

```mermaid
graph TD
    subgraph Front
      subgraph Liveroom.app
        Admin(<b>Admin</b> <br/> LiveView)
      end
      subgraph MySaaS.com
        Client(<b>Client</b> <br/> Custom HTML Element)
      end
    end

    subgraph Liveroom Server
      ClientProcess
      AdminProcess
    end

    Client <-- LiveState --> ClientProcess
    Admin <-- LiveView --> AdminProcess
```

**ClientProcess** & **AdminProcess** communicate with each other over PubSub (can't draw it properly on the Mermaid graph), on a particular **room** (topic).

The HTML Custom Element allows Liveroom to be plug-and-play on any SaaS product easily.

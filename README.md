This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# MUJIN Frontend Programming Challenge

Greetings, candidate! This programming challenge will assess your full-stack software engineering skills during our hiring process. You will be tasked with developing an Automated Guided Vehicles (AGV) management system from scratch. AGVs are commonly used in warehouse automation to transport items and shelves from source to destination.

A map is necessary to efficiently plan and manage the AGVs movement and jobs. It is a directed graph where AGVs are supposed to move along the edges of the graph. Assume all the edges are axis-aligned.


## Requirements

### Map editing

A map consists of a list of `nodes`

Each `node` has the following properties:

- `x`, `y` are 2 integer properties, representing the coordinates of the node in the map, in millimeters. Note that 2 nodes can only be connected if either they have the exact same x value or exact same y value. AGVs cannot travel diagonally.
- `code` is an integer, representing the QR code value on the floor.
- `directions` optional property. If specified, it is a list of directions an AGV can travel from this node. Note that the North direction points in the positive X direction on the map, and the West direction points in the positive Y direction on the map.
- `charger` optional property. If specified, the node has a charger that the AGV can plug itself into. The charger has a direction property indicating the relative direction to the node. The AGV needs to backwards into the charger's direction and cannot rotate at the node.
- `chute` optional property. If specified, the node has a gravity conveyor that allows ejection of payload from the AGV. The chute has a direction property indicating the direction in which the payload is ejected.
- `spawn` optional property. If specified, the node can stack infinite AGVs, and other nodes can have one AGV at a time.
- `name` optional property. A string that gives a user-friendly name to the node on the map.

The app should be able to visualize the map in realistic scale and proportions. You will implement node creation, deletion, editing in a reasonable way. Assume the warehouse size is not larger than 500m by 500m.

Bonus:

- Support zooming. Allow user to zoom out to see the entire warehouse layout.
- Support mini map. Allow user to know which region is being shown.
- Support tiled rendering.


### AGV Status

An AGV has the following properties.

- `serial` is the hardware id of the AGV.
- `battery` is the battery level of the AGV, ranging from 0 to 100.
- `payload` is the current payload of AGV. Assume the AGV's maximum payload is 800 kg.
- `position` is the current position of the AGV on the map.
- `heading` is the current direction the AGV is facing in.
- `isCharging` indicates whether the AGV is charging.
- `isMoving` indicates whether the AGV is moving.
- `message` is a human-readable status message.

The app should be able to visualize the current position and heading of the AGV. Assume the AGV size is 1000mm by 800mm.

Bonus:

- Show battery level, payload, and moving status of the AGV as well.

### AGV control

In addition to map editing, the app should be able to register new AGVs into the system. A new AGV can only spawn from a spawn node. After the AGV is spawned, the app can control the AGV manually using the keyboard's WASD keys / Arrow keys to move the AGV around the map. AGVs can only move forwards and backwards as well as rotate in 90 degree steps. AD/left,right rotates AGVs counter-clockwise and clockwise respectively.

Assume an AGV moves at the speed of 1m/s without considering acceleration or deceleration.

Bonus:

- Support move commands. An AGV would be able to receive commands such as `move to charger` or `move to node`. Note that these two commands are different in that AGV would need to move backwards relative to the node's charger. If the a path exists, the AGV will start moving. Otherwise, an error message should be clearly indicated. While moving, the AGV can receive a `stop` command after which it will stop once it reaches the next node on the path.
- Support adding multiple AGVs in the warehouse. Assume only one AGV can move at a time.

### Backend server

The map data should be read from and written to an HTTP server using a well-designed RESTful or GraphQL API.

Bonus:

- Store status of all AGVs to DB.
- Use websocket to sync position and status of AGVs across multiple browser clients.

## Technical stacks

- Frontend: TypeScript, React (Styling is of your choice, e.g. css module, scss, tailwind or css-in-js etc.)
- Server: Choose from Python, Golang, Rust, NodeJS or PHP
- DB: Your choice

You may use any suitable 3rd party libraries.

## Deliverables
1. All source code and documentation you have created should be committed to a private git repository.
2. The access to the git repository should be shared.
2. A docker image containing a production build for deployment, pushed to the docker hub and executable by `docker run`.
3. Some documentation on how to run and test your deliverables.


## Appendix

### Map format

Refer to `agv_map.json`.

### AGV status format

Refer to `agv_status.json`.
import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const SandboxPortal = ({children, sandbox}) => {
    const iFrameBody =
        sandbox.current?.contentWindow?.document?.body ??
        document.getElementById("mobile-sandbox").contentWindow.document.body;
    if (!iFrameBody) return <noscript />;
    return ReactDOM.createPortal(
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.08)",
                left: "0px",
                top: "0px",
            }}
        >
            {children(iFrameBody)}
        </div>,
        iFrameBody
    );
};

// const MobileSandbox = ({children}) => {
//     const ref = useRef(null);
//     const [, forceUpdate] = useState(false);

//     useEffect(() => {
//         function handleLoad() {
//             const frameHead = ref.current?.contentWindow?.document?.head;
//             const parent = document.head;
//             NodeList.prototype.forEach = Array.prototype.forEach;
//             let children = parent.childNodes;
//             children.forEach(function (item) {
//                 let cln = item.cloneNode(true);
//                 frameHead.appendChild(cln);
//             });
//             forceUpdate((v) => !v);
//         }
//         const iframe = ref.current;
//         iframe.addEventListener("load", handleLoad);
//         return () => iframe.removeEventListener("load", handleLoad);
//     }, []);
//     return (
//         <>
//             <iframe
//                 id="mobile-sandbox"
//                 srcDoc={`<!DOCTYPE html>`}
//                 ref={ref}
//                 title="mobile-sandbox"
//                 width="375"
//                 height="667"
//                 frameBorder="0"
//                 style={{border: "solid 1px black"}}
//             />
//             {ref.current && <SandboxPortal sandbox={ref} children={children} />}
//         </>
//     );
// };

export const MobileSandbox = ({children}) => {
    const [contentRef, setContentRef] = useState(null);
    const mountNode = contentRef?.contentWindow?.document?.body;

    return (
        <iframe
            id="mobile-sandbox"
            // srcDoc={`<!DOCTYPE html>`}
            ref={setContentRef}
            title="mobile-sandbox"
            width="375"
            height="667"
            frameBorder="0"
            style={{border: "solid 1px black"}}
        >
            {mountNode && ReactDOM.createPortal(children, mountNode)}
        </iframe>
    );
};

MobileSandbox.defaultProps = {};

MobileSandbox.propTypes = {};

export default MobileSandbox;
// This could be handled multiple ways and is dependent on the size of the application and the frequency of the request. For a mid to large size app I would dispatch the API request using Redux, preferably with Redux Thunk as a middle-ware. The Redux action would handle the making the fetch request and updating the store accordingly on successful responses. Components dependent on the API response data would either use Redux's useSelector hook to access the store and return the required data, or a parent component would handle accessing the store and the data driven Components wouldn't be rendered until the props they require are accessible.

// If this was a smaller app, something like a single page that only leverages a few APIs, the fetch could be managed by the Component and the response data would be directly saved to the it's state using useState or useReducer hook.

// The frequency of the API calls is also important as even with a smaller application I would recommend moving the fetch logic off the Component to avoid  unnecessary rerenders if the API needs to be polled at a given interval.

// In React I have used four different methods to manage the global application state.

// 1. Redux - Using Redux allows developers to separate their concerns allowing their components to remain lean and data driven without unnecessary management of pass-through props which will lead to rerenders. My favorite thing about Redux is the ability to visualize and track the global state via their Dev-Tool.

// 2. Context API - React's Context API provides state access to all the children of the Context Provider without hassle of prop drilling. Components dependent on the state can become a Context Consumer and listen to data changes directly without effecting their parent components.

// 3. Component State - For some smaller applications that only support a limited number of views and only hit a few API endpoints, it's easier to manage the application state from one top level component. Using Redux requires a decent amount of boilerplate to create actions, reducers and implement a selector for each component and the Context API isn't useful if each child component is populated from the data passed in through props.

// 4. usePubSub - This was a custom solution I made to manage global state for an application where most of the business logic was handled outside of React Components. The React Component used a custom usePubSub hook to specify the props that they wanted to listen to for changes. Then when a supporting modules updated their context(state) they published the changes to a PubSub object. The PubSub object would then merge the changes with the global states invoke the listeners that were subscribed to the fields that were updated.

// The key features my team wanted to include was the ability to track pending, scheduled, published and failed highlights. Also the user should be able to view pending highlights and modify any of its meta data (ie. title, description, hashtags, transitions). Pending highlights would either be approved and immediately published or rejected and taken out of the publishing pipeline. Additionally we thought it was a important that the application was mobile responsive so that the approval queue would be accessible and easy to manage.

// In early March, of this year, my company held a week long Hack-a-thon that consisted of four predefined projects. While the offered projects were interesting, I saw this a great opportunity to work on a project I've been wanting to explore and I believed it would bring immediate value to our company.

// After speaking with the CEO he allowed me to work on the project with the exception that I could only recruit one Backend Engineer so that effort wasn't taken away from their prepared projects. With a smaller team I handled all the frontend work while my partner worked on the related backend tasks.

// The company I worked for specialized in creating automated sport highlights that could be auto published to multiple social media destinations at a desired frequency. The project I wanted to work on was creating a publishing approval queue for these auto published highlights.

// The idea was to create a light-weight accessible application that would allow our clients to track the status of their highlights in real-time. Once a highlight was created it would then require approval from the client so that it could be published.

// The key features my team wanted to include was the ability to track pending, scheduled, published and failed highlights. Also the user should be able to watch pending highlights and modify any of its meta data (ie. title, description, hashtags, transitions). Pending highlights would either be approved and immediately published or rejected and taken out of the publishing pipeline. Additionally we thought it was important that the application was mobile responsive so that the approval queue would be accessible and easy to manage.

// In the end the finished project was a fully functional, production ready, progressive web application and received overwhelming praise from my company's leadership team. All of our desired functionality was implemented in half the time we projected which allowed us to take on more advanced features. The added functionality included:
// - Republishing highlight to different destinations.
// - Providing published statuses from the destinations.
// - Including a link to the highlights location after it successfully published.
// - Allowing the user to pre-approve or cancel publishes prior to the highlight entering the pending queue.
// - Implementing support for downloading the PWA to a mobile phone's home screen.
// - Leveraging a Service Worker to cache assets and offer limited offline support.
// - Creating a responsive UI that supported desktop and tablets, as well at the initially targeted mobile screen.

// The project was so well received that the leadership team decided to make it a production application the following day and a team was put together to continue development.

// The reason I'm proud of this project is because not only did my partner and I exceed our own expectations and create a fully feature app in such a short period of time, but I felt strongly that this project had a lot of potential and after taking a chance, I was able to deliver.

// What draws me the most to this role is the team I would be working with. My primary focus when looking at a potential job opportunity is establishing that I will have open channels of communication with the team members I will be directly working with.

// As a Frontend Engineer my tasks are generally a direct collaboration from product and design. I'm a perfectionist and I like to work in a fast paced environment so open communication with these teams allows me easily clarify uncertainties, ask questions and request feedback.

// I'm also pleased to see that this position is working closely with a Lead Frontend Engineer. Despite having led projects and mentored Engineers, I thrive on feedback and expect constructive criticism on my work. I'm eager to improve and I'm only interested in opportunities that provide strong leadership and an atmosphere to learn. I see on your website's "About Us" page that "growth is encouraged, with lots of direct feedback.", and for me, that sounds like the exact work culture I'm striving for.

// In React I have used five different methods to manage the global application state.

// 1. Redux - Using Redux allows developers to separate their concerns allowing their components to remain lean and data driven without unnecessary management of pass-through props which will lead to rerenders. Redux does have a few caveats, but what I do like about it is it's flexibility to create and apply custom middle-ware functions, persisting state to local storage is easy to implement but my favorite feature is the ability to visualize and track the global state via their Dev-Tool. This makes development and bug hunting a lot easier.

// 2. Apollo (GraphQl) InMemoryCache - In the latest version of Apollo, a javascript GraphQl framework, InMemoryCache comes out of the box, and requires very little maintenance. What's great about Apollo's global state management is that Apollo populates the state automatically based on the __typename and id on the objects returned in api responses. Every get request made will results in a global state update and it requires no additional work from the developer. All data provided by GraphQl api's also update in sync with changes to the InMemoryStory, so the Components and store are always in sync. The InMemoryCache can also be directly accessed for unique queries by making the same api call's and appending a @client token.

// 3. Context API - React's Context API provides state access to all the children of the Context Provider without hassle of prop drilling. Components dependent on the state can become a Context Consumer and listen to data changes directly without effecting their parent components. This is great when only certain nested child components depend on the same data because the other pure React solution would be to hoist the state to a common parent node and then cause every component in between to rerender when they're dependents didn't change and to be bloated with access data.

// 4. Component State - For some smaller applications that only support a limited number of views and only hit a few API endpoints, it's easier to manage the application state from one top level component. Using Redux requires a decent amount of boilerplate to create actions, reducers and implement a selector for each component and the Context API isn't useful if each child component is populated from the data passed in through props. In some situations hoisting the state to a controlling parent component make perfect sense and creating extra layers of abstraction would only make the components updates less responsive. It's worth mentioning that this solution doesn't scale and if you know the application will grow it would be a better practice to support a different method of state management from the start.

// 5. usePubSub - This was a custom solution I made to manage global state for an application where most of the business logic was handled outside of React Components. The React Component used a custom usePubSub hook to specify the props that they wanted to listen to for changes. Then when a supporting modules updated their context(state) they published the changes to a PubSub module. The PubSub module would then merge the changes with the global states invoke the listeners that were subscribed to the fields that were updated. This solution worked really well because similar to React Context, each component had the ability to isolate their concerns with respect to data without effecting other components, the difference being that updates were invoked outside of a React Component.

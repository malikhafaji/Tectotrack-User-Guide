// script.js

document.addEventListener("DOMContentLoaded", () => {
    const sidebarNav = document.getElementById("sidebar-nav"); // Ensure your sidebar nav has this ID
    if (!sidebarNav) {
        console.error("Sidebar navigation element not found!");
        return;
    }

    // Create a <ul> element
    const ul = document.createElement("ul");

    // Select all headings (h2, h3, etc.)
    const headings = document.querySelectorAll("h2, h3");

    let currentH2ListItem = null;

    headings.forEach((heading) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        // Set the link text and href
        link.textContent = heading.textContent;
        link.href = `#${heading.id || generateId(heading)}`;

        listItem.appendChild(link);

        if (heading.tagName.toLowerCase() === "h2") {
            // Append the <li> to the main <ul>
            ul.appendChild(listItem);
            currentH2ListItem = listItem; // Track the current h2 list item
        } else if (heading.tagName.toLowerCase() === "h3" && currentH2ListItem) {
            // Create or find a child <ul> under the current h2 list item
            let childUl = currentH2ListItem.querySelector("ul");
            if (!childUl) {
                childUl = document.createElement("ul");
                currentH2ListItem.appendChild(childUl);
            }
            childUl.appendChild(listItem); // Append the h3 list item to the child <ul>
        }
    });

    // Append the <ul> to the sidebar navigation
    sidebarNav.appendChild(ul);

    // Generate a unique ID for headings without one
    function generateId(heading) {
        const id = heading.textContent
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]/g, "");
        heading.id = id;
        return id;
    }
});
window.addEventListener('load', (event)=>{
    // Create a list of urls for the portal.
    const links = [
        [
            {
                label: "Week 1 notes",
                url: "week1/index.html"
            }
        ],
        [
            {
                label: "Week 2 notes",
                url: "week2/index.html"
            }
        ],
        [
            {
                label: "Week 3 notes",
                url: "week3/index.html"
            }
        ],
        [
            {
                label: "Week 4 notes",
                url: "week4/index.html"
            }
        ],
        [
            {
                label: "Week 5 notes",
                url: "week5/index.html"
            }
        ],
        [
            {
                label: "Week 6 Todo App",
                url: "week6/index.html"
            }
        ],
        [
            {
                label: "Week 7 Notes",
                url: "week7/index.html"
            }
        ],
        [
            {
                label: "Week 8 Notes",
                url: "week8/index.html"
            }
        ]
    ];

    // Find the object for adding the url.
    let card = document.getElementById("assignment");

    // Loop through each item until all the urls are added.
    for (i = 0; i < links.length; i++) {
        // Create the core object.
        let header = document.createElement("h2");
        let list = document.createElement("ol");

        // Add the text to the header and apppend it.
        header.textContent = "Week " + (i + 1);
        card.appendChild(header);

        // Loop through each item in each week.
        for (j = 0; j < links[i].length; j++) {
            // Create a link and item element.
            let item = document.createElement("li");
            let link = document.createElement("a");

            // Add the data to the link element.
            link.textContent = links[i][j].label;
            link.setAttribute("href", links[i][j].url);

            // Append the link to the item and then to list.
            item.appendChild(link);
            list.appendChild(item);
        };

        // Append the list to the card.
        card.appendChild(list);
    };
});
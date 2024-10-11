// Document data with 3D coordinates
const documents = [
    // Gene Therapy for Cystic Fibrosis (Positive Examples)
    {
        x: 1, y: 2, z: 3, color: '#1f77b4', // Pastel blue
        title: 'Gene Therapy for Cystic Fibrosis: A Phase 3 Clinical Trial',
        content: 'Details about the effectiveness of gene therapy in treating cystic fibrosis...',
        topic: 'cystic fibrosis'
    },
    {
        x: 1.2, y: 2.1, z: 2.9, color: '#1f77b4',
        title: 'Advancements in Cystic Fibrosis Gene Therapy',
        content: 'Recent developments in gene therapy techniques for cystic fibrosis patients...',
        topic: 'cystic fibrosis'
    },
    // Gene Therapy for Muscular Dystrophy (Negative Examples)
    {
        x: 4, y: 5, z: 6, color: '#2ca02c', // Pastel green
        title: 'Gene Therapy for Muscular Dystrophy: Mechanisms and Results',
        content: 'Exploration of gene therapy applications in muscular dystrophy treatment...',
        topic: 'muscular dystrophy'
    },
    {
        x: 4.2, y: 5.1, z: 5.9, color: '#2ca02c',
        title: 'Progress in Muscular Dystrophy Gene Therapy Trials',
        content: 'An overview of clinical trials for gene therapy targeting muscular dystrophy...',
        topic: 'muscular dystrophy'
    }
];

let queryPoint = null;

// Function to draw the 3D scatter plot
function drawPlot() {
    // Prepare data for Plotly
    const docTrace = {
        x: documents.map(doc => doc.x),
        y: documents.map(doc => doc.y),
        z: documents.map(doc => doc.z),
        text: documents.map(doc => `${doc.title}`),
        mode: 'markers',
        type: 'scatter3d',
        marker: {
            size: 6,
            color: documents.map(doc => doc.color)
        },
        hoverinfo: 'text'
    };

    const data = [docTrace];

    if (queryPoint) {
        const queryTrace = {
            x: [queryPoint.x],
            y: [queryPoint.y],
            z: [queryPoint.z],
            text: [`Query: ${queryPoint.text}`],
            mode: 'markers',
            type: 'scatter3d',
            marker: {
                size: 8,
                color: '#d62728', // Bright red for the query marker
                opacity: 0.9
            },
            hoverinfo: 'text'
        };

        // Lines from query to matched documents
        const lines = queryPoint.matches.map(match => {
            return {
                x: [queryPoint.x, match.x],
                y: [queryPoint.y, match.y],
                z: [queryPoint.z, match.z],
                mode: 'lines',
                line: {
                    color: '#d62728',
                    width: 3 // Increase line width for better visibility
                },
                type: 'scatter3d',
                hoverinfo: 'none'
            };
        });

        data.push(queryTrace, ...lines);
    }

    const layout = {
        paper_bgcolor: '#121212',
        plot_bgcolor: '#121212',
        scene: {
            xaxis: { title: 'X', color: '#ffffff' },
            yaxis: { title: 'Y', color: '#ffffff' },
            zaxis: { title: 'Z', color: '#ffffff' },
            bgcolor: '#121212',
            aspectratio: { x: 1.5, y: 1.5, z: 1.5 }, // Adjust these ratios to change the size
            camera: {
                eye: { x: 2.5, y: 1.5, z: 1 } // Rotate the view without drastically changing the zoom
            }
        },
        margin: { l: 0, r: 0, b: 0, t: 0 },
        hoverlabel: { bgcolor: '#333333', font: { color: '#ffffff' } }
    };

    Plotly.newPlot('embeddingPlot', data, layout);
}
function handleSelectChange() {
    const querySelect = document.getElementById('query-select');
    const queryInput = document.getElementById('query-input');

    // Set the input value to the selected query from the dropdown
    if (querySelect.value !== '') {
        queryInput.value = querySelect.value;
    }

    // Automatically trigger a search (optional)
    if (querySelect.value !== '') {
        document.getElementById('query-button').click(); // This simulates a search click
    }
}

// Handle Clear Query functionality
document.getElementById('clear-button').addEventListener('click', function() {
    // Clear the input field and the dropdown
    document.getElementById('query-input').value = '';
    document.getElementById('query-select').value = '';

    // Clear the plot by resetting the data (remove the query point)
    queryPoint = null;
    drawPlot(); // Redraw the plot without the query point
});



// Handle query input
document.getElementById('query-button').addEventListener('click', handleQueryButtonClick);

function handleQueryButtonClick() {
    const queryText = getQueryText();
    if (queryText === '') {
        alert('Please enter or select a query.');
        return;
    }
    processQuery(queryText);
}

function getQueryText() {
    const querySelect = document.getElementById('query-select');
    const queryInput = document.getElementById('query-input');
    let queryText = '';

    if (queryInput.value.trim() !== '') {
        queryText = queryInput.value.trim();
    } else if (querySelect.value !== '') {
        queryText = querySelect.value;
    }

    return queryText;
}
function containsKeyword(queryText, keywordList) {
    const lowerQuery = queryText.toLowerCase();
    return keywordList.some(keyword => lowerQuery.includes(keyword));
}

function processQuery(queryText) {
    // Define keywords for each category
    const cysticFibrosisKeywords = ['cystic fibrosis', 'cf', 'lung', 'lung disease', 'genetic disorder'];
    const muscularDystrophyKeywords = ['muscular dystrophy', 'md', 'muscle', 'muscle degeneration', 'dystrophy'];

    let queryX, queryY, queryZ;

    // Check for cystic fibrosis related keywords
    if (containsKeyword(queryText, cysticFibrosisKeywords)) {
        queryX = 1.1; queryY = 2.05; queryZ = 3;
    }
    // Check for muscular dystrophy related keywords
    else if (containsKeyword(queryText, muscularDystrophyKeywords)) {
        queryX = 4.1; queryY = 5.05; queryZ = 6;
    }
    // Example for a specific unrelated word
    else if (queryText.toLowerCase().includes('batman')) {
        queryX = 2.5; queryY = 3; queryZ = 10.5;
    }
    // Randomize the query point for unrelated words
    else {
        const rangeMin = 7.5; // Define the minimum random range away from known points
        const rangeMax = 10;  // Define the maximum random range away from known points

        queryX = getRandomArbitrary(rangeMin, rangeMax);
        queryY = getRandomArbitrary(rangeMin, rangeMax);
        queryZ = getRandomArbitrary(rangeMin, rangeMax); // Randomized position
    }

    queryPoint = {
        x: queryX,
        y: queryY,
        z: queryZ,
        text: queryText,
        matches: []
    };

    // Calculate distances to documents
    documents.forEach(doc => {
        const dx = doc.x - queryPoint.x;
        const dy = doc.y - queryPoint.y;
        const dz = doc.z - queryPoint.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        doc.distanceToQuery = distance;
    });

    // Find top matches
    const sortedDocs = documents.slice().sort((a, b) => a.distanceToQuery - b.distanceToQuery);
    queryPoint.matches = sortedDocs.slice(0, 2);

    // Redraw the plot
    drawPlot();
}

// Helper function to generate a random number within a range
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


// Initial draw
drawPlot();

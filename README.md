# Simlabs Context Document Embeds

## Overview

I love learning, and with the rapid advancements in AI, there's always something new to explore every day. Today was one of those "aha" moments for me, so I decided to create a quick app visualization using ChatGPT. In just a few minutes, I was able to grasp the concept and bring it to life.

The inspiration behind this project came from the research paper ["Contextual Document Embeddings"](https://arxiv.org/abs/2410.02525) by John X. Morris and Alexander M. Rush. 

In short, this technique uses contrastive learning to group contextually similar documents, which greatly improves retrieval systems by better understanding the relationships between documents. 

For example, imagine having multiple patient records in a healthcare setting—contextual embeddings can help group similar cases together. This means that medical reports with similar symptoms or treatments are clustered, making it easier for professionals to retrieve relevant information quickly.

So, I built a mini app that visually shows how documents relate to each other in 3D space. You can see how context enables AI to group semantically similar documents.

In this visualization, documents are represented as 3D points, and similar documents naturally cluster together through contrastive learning. It’s an effective way to see how AI embeddings work in practice. You can interact with the plot and see how different queries change the relationship between documents.

## Features

- **3D Visualization**: A Plotly-based 3D scatter plot showing the relationship between documents based on their contextual embeddings.
- **Contextual Embeddings**: Documents related to similar topics are clustered together. For example, documents about "Cystic Fibrosis" and "Muscular Dystrophy" form groups based on their content.
- **Interactive Queries**: Enter a query to find related documents. Queries that are semantically close will highlight the relevant clusters, while unrelated queries will randomize the position of the query point.
- **Fun Twist**: As a bonus, you can even enter "Batman" to get some interesting ideas for gene therapy. 🦇

## Demo

Check out the live demo of the app here:  
👉 [Live Demo on Glitch](https://simlabs-context-doc-embeds.glitch.me/)

### Preview

![Contextual Document Embedding Visualization](assets/demo.gif)
This GIF shows the dynamic interactions and how documents relate to one another in 3D space based on context.

## How It Works

This visualization uses **contrastive learning** to group contextually similar documents, making document retrieval more efficient by understanding the relationships between documents in a meaningful way. 

In the 3D plot:
- **Blue points** represent documents related to Cystic Fibrosis.
- **Green points** represent documents related to Muscular Dystrophy.
- **Red points** indicate the query point based on user input, and lines are drawn from the query to the closest documents.

### Technologies Used

- **HTML/CSS/JavaScript** for the front-end.
- **Plotly.js** for 3D visualization.
- **Contextual Document Embeddings** based on the research paper by Morris and Rush.

## Running Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/simlabs-context-doc-embeds.git
    ```

2. Navigate into the project directory:

    ```bash
    cd simlabs-context-doc-embeds
    ```

3. Open the `index.html` file in a browser to view the visualization locally.

## Inspiration

The research paper that inspired this project is ["Contextual Document Embeddings"](https://arxiv.org/abs/2410.02525). This technique allows for better retrieval systems by understanding the context and relationships between documents.

## Contact

Feel free to reach out if you're as curious as I am about contextual embeddings or if you have any questions about this project. I'm always excited to connect with fellow learners and enthusiasts!

- **LinkedIn**: [Simran Butalia](https://www.linkedin.com/in/sbutalia)
- **GitHub**: [Simlabs Context Doc Embeds](https://github.com/simlabs-context-doc-embeds)

---

**Bonus:** If you enter "Batman" into the query, you might just discover some interesting ideas for gene therapy. After all, who knows what mysteries lie in the bat signal? 🦇

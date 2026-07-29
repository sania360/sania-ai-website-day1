from sqlalchemy.orm import Session
from app.models.blog import Blog

STARTER_POSTS = [
    {
        "slug": "bioinformatics-day-to-day",
        "title": "What Bioinformatics Actually Looks Like Day to Day",
        "category": "Bioinformatics",
        "tags": "bioinformatics,python,genomics",
        "featured_image": None,
        "excerpt": "Bioinformatics work is less about dramatic discoveries and more about careful, repeatable data handling. Here's what a typical week actually involves.",
        "content_markdown": (
            "## More data wrangling than you'd expect\n\n"
            "Most days start with checking raw sequence files for quality issues before "
            "any real analysis begins — a step that's easy to skip and expensive to regret.\n\n"
            "## Small tools, used constantly\n\n"
            "BLAST, FastQC, and PyMOL aren't glamorous, but they're the tools that actually "
            "get used, day after day, on real datasets.\n\n"
            "## Documentation matters as much as code\n\n"
            "A pipeline that works but isn't documented is a pipeline nobody else can trust."
        ),
    },
    {
        "slug": "why-ml-projects-fail",
        "title": "Why Most ML Projects Fail Before the Model Is Even Built",
        "category": "Machine Learning",
        "tags": "machine-learning,data-science,strategy",
        "featured_image": None,
        "excerpt": "The model is rarely the problem. Here's where most machine learning projects actually go wrong.",
        "content_markdown": (
            "## The data was never the right shape for the question\n\n"
            "A lot of projects start with a dataset and a hope, rather than a clearly defined "
            "question the data can actually answer.\n\n"
            "## Evaluation metrics chosen after the fact\n\n"
            "Picking your success metric before training — not after — keeps a project honest.\n\n"
            "## No plan for what happens after 90% accuracy\n\n"
            "A working model that never gets deployed or used isn't a finished project."
        ),
    },
    {
        "slug": "building-a-rag-chatbot",
        "title": "Building a RAG Chatbot: A Practical Walkthrough",
        "category": "AI",
        "tags": "ai,rag,chatbots,nlp",
        "featured_image": None,
        "excerpt": "A grounded, practical look at what it actually takes to build a retrieval-augmented chatbot that doesn't hallucinate.",
        "content_markdown": (
            "## Start with the retrieval, not the model\n\n"
            "A RAG chatbot is only as good as what it retrieves — get the embeddings and "
            "chunking strategy right before worrying about the LLM.\n\n"
            "## Chunk size is a real design decision\n\n"
            "Too small and you lose context; too large and retrieval gets noisy. This needs "
            "testing against real queries, not guessing.\n\n"
            "## Ground every answer in a citation\n\n"
            "If the chatbot can't point to where an answer came from, it shouldn't give that answer."
        ),
    },
]


def seed_blog_posts(db: Session) -> None:
    if db.query(Blog).first():
        return
    for post in STARTER_POSTS:
        db.add(Blog(**post))
    db.commit()

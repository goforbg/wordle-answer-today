const date_today = new Date().toLocaleDateString("en-US")

document.title = `Wordle Answer Today - ${date_today}`

const fetch_answer_today = () => {

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" }
    };

    document.getElementById('solution').textContent = "Loading..."

    fetch("/.netlify/functions/solution", options)
        .then((res) => res.json())
        .then((res) => {
            document.getElementById('solution').textContent = res.solution
        })
        .catch((err) => {
            console.log(err)
            document.getElementById('solution').textContent = `Oops, try refreshing the page.`
        });
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
        fetch_answer_today();
    }
});


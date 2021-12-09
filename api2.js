const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const searchBook = () => {
    const searchFeild = document.getElementById("input-text");
    const searchText = searchFeild.value;
    // show spinner
    toggleSpinner('block');
    console.log(searchText);
    searchFeild.value = "";

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs))
}

const displayBook = (books) => {
    const searchResult = document.getElementById("search-result");
    const count = document.getElementById("result-count");
    searchResult.textContent = '';
    if (books.length == 0) {
        const h2 = document.createElement('h2');
        h2.innerText = 'sorry no result found';
        searchResult.appendChild(h2);
        count.textContent = '';
        toggleSpinner('none');
    }
    else {
        books.forEach(book => {
            console.log(book);
            count.textContent = `Total search result found: ${books.length}`;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
            <img style="border-radius: 17px; height: 350px; width: auto;" class="img-thumbnail" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Author Name: ${book.author_name}</p>
            <p class="card-text">Publisher Name: ${book.publisher}</p>
            <p class="card-text"><small class="text-muted">first_publish_year: ${book.first_publish_year}</small></p>
            </div>`;
            searchResult.appendChild(div);
        })
        toggleSpinner('none');
    }
}
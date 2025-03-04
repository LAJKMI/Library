class Book {
    constructor(title, author, id) {
        this.title = title
        this.author = author
        this.id = id
    }
}

class Notes {
    constructor(id) {
        this.id = id;
        this.list = {};
        for (let i = 0; i < 50; i++) {
            this.list[i] = '';
        }
    }
}

class UI {
    static escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            return ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            })[match];
        });
    }

    static defoultListShow() {
        readList.forEach(book => {
            const table = document.getElementById('book-list')
            const row = document.createElement('tr')
            UI.addInnerHtML(row, 'Add Notes', book, 'addNotes', 'readList', '', 'addToFavoriteBtn', 'C0C0C0')
            table.appendChild(row)
        })
    }

    static playAndMuteBacgroundMusic() {

        const soundBox = document.getElementById('soundBox')
        const soundBtn = document.getElementById('soundBtn')
        const noSoundBtn = document.getElementById('noSoundBtn')

        const backgroundSong = 'assets/audio/backgroundMusic.mp3'

        const backgroundSound = new Audio(backgroundSong)

        soundBox.addEventListener('click', () => {
            if (noSoundBtn.style.visibility === 'visible') {
                soundBtn.style.visibility = 'visible'
                noSoundBtn.style.visibility = 'hidden'
                backgroundSound.muted = false
            } else {
                soundBtn.style.visibility = 'hidden'
                noSoundBtn.style.visibility = 'visible'
                backgroundSound.muted = true
            }
        })

        document.addEventListener('click', () => {
            backgroundSound.play()
            backgroundSound.loop = true
        })



    }

    static addToLocalStorage(key, listType) {
        localStorage.setItem(key, JSON.stringify(listType));
    }

    static getFromLocalStorage(key, list) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            try {
                const storedList = JSON.parse(storedData);
                if (Array.isArray(storedList)) {
                    list.push(...storedList);
                } else {
                    console.warn("Ovi podaci nisu lista", storedList);
                }
            } catch (error) {
                console.error("Nije parsirao json iz local storidza", error);
            }
        } else {
            console.warn("Nema podataka za ovaj kljuc", key);
        }
    }


    static async bookFetch(url) {
        try {
            const response = await fetch(url);
            const book = await response.json();
            avalibleRecommendations.push(...book);
            UI.addToLocalStorage(avalibleRecommendationsKey, avalibleRecommendations)
        } catch (error) {
            console.error("Error fetching books:", error);
        }

    }


    static addBookToList(book, listType) {

        listType.push(book)
    }

    static addInnerHtML(element, btnType, book, btnTypeClass, deleteBtnLocation, recommendedBtn, toggleFavoriteClass, starFill) {
        element.innerHTML = `
                <td class="titleTd">
                    <div class="titleTdBox">
                      ${UI.escapeHTML(book.title)} 
                      <svg class = ${toggleFavoriteClass}  width="24" height="24" viewBox="0 0 32 32" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M29.8975 12.1575C29.7725 11.7732 29.5365 11.4344 29.2193 11.1839C28.9021 10.9335 28.5179 10.7825 28.115 10.75L20.74 10.155L17.8925 3.26874C17.7385 2.89352 17.4764 2.57255 17.1395 2.34667C16.8027 2.12078 16.4062 2.00017 16.0006 2.00017C15.595 2.00017 15.1986 2.12078 14.8617 2.34667C14.5248 2.57255 14.2627 2.89352 14.1087 3.26874L11.2637 10.1537L3.88499 10.75C3.48146 10.7841 3.09698 10.9366 2.77971 11.1883C2.46244 11.4399 2.2265 11.7796 2.10144 12.1648C1.97639 12.55 1.96778 12.9635 2.0767 13.3536C2.18562 13.7436 2.40722 14.0928 2.71374 14.3575L8.33874 19.2112L6.62499 26.4687C6.52915 26.863 6.55262 27.2769 6.69242 27.6578C6.83222 28.0387 7.08205 28.3695 7.41019 28.6082C7.73834 28.8469 8.13 28.9827 8.53546 28.9984C8.94092 29.014 9.3419 28.9089 9.68749 28.6962L16 24.8112L22.3162 28.6962C22.662 28.9064 23.0621 29.0095 23.4663 28.9926C23.8705 28.9758 24.2607 28.8397 24.5877 28.6016C24.9148 28.3634 25.164 28.0338 25.3041 27.6543C25.4442 27.2748 25.4689 26.8623 25.375 26.4687L23.655 19.21L29.28 14.3562C29.589 14.092 29.8126 13.742 29.9226 13.3506C30.0325 12.9592 30.0238 12.544 29.8975 12.1575ZM27.98 12.8412L21.8925 18.0912C21.7537 18.2109 21.6504 18.3664 21.594 18.5408C21.5375 18.7152 21.5301 18.9017 21.5725 19.08L23.4325 26.93C23.4373 26.9408 23.4378 26.9531 23.4338 26.9642C23.4299 26.9754 23.4218 26.9846 23.4112 26.99C23.3887 27.0075 23.3825 27.0037 23.3637 26.99L16.5237 22.7837C16.3662 22.6869 16.1849 22.6356 16 22.6356C15.8151 22.6356 15.6338 22.6869 15.4762 22.7837L8.63624 26.9925C8.61749 27.0037 8.61249 27.0075 8.58874 26.9925C8.57819 26.9871 8.57011 26.9779 8.56615 26.9667C8.5622 26.9556 8.56268 26.9433 8.56749 26.9325L10.4275 19.0825C10.4699 18.9042 10.4625 18.7177 10.406 18.5433C10.3496 18.3689 10.2463 18.2134 10.1075 18.0937L4.01999 12.8437C4.00499 12.8312 3.99124 12.82 4.00374 12.7812C4.01624 12.7425 4.02624 12.7475 4.04499 12.745L12.035 12.1C12.2183 12.0843 12.3936 12.0183 12.5418 11.9094C12.69 11.8004 12.8053 11.6527 12.875 11.4825L15.9525 4.03124C15.9625 4.00999 15.9662 3.99999 15.9962 3.99999C16.0262 3.99999 16.03 4.00999 16.04 4.03124L19.125 11.4825C19.1953 11.6528 19.3113 11.8003 19.4602 11.9089C19.6091 12.0174 19.7851 12.0827 19.9687 12.0975L27.9587 12.7425C27.9775 12.7425 27.9887 12.7425 28 12.7787C28.0112 12.815 28 12.8287 27.98 12.8412Z"
                          fill="#${starFill}" />
                      </svg>
                    </div>
                  </td>
                  <td class="authorTd">${UI.escapeHTML(book.author)}</td>
                  <td class="addToReadTd">
                    <div class="tableBtnBox">
                      <button class="${btnTypeClass} ">${btnType}</button>
                      ${recommendedBtn}
                    </div>
                  </td>
                  <td class="deleteBtnTd">
                      <button class="delete ${deleteBtnLocation}">
                        X
                      </button>
                  </td>
    
        `


    }

    static deleteBook(target) {
        if (target.classList.contains('delete')) {
            const row = target.closest('tr')
            const title = row.querySelector('.titleTdBox').textContent.trim()
            const author = row.querySelector('.authorTd').textContent.trim()
            localStorage.getItem(allNotesKey, allNotes)



            let index

            if (target.classList.contains('readList')) {
                const book = readList.find(b => b.title == title && b.author == author);
                note = allNotes.findIndex(n => n.id == book.id);




                index = readList.findIndex(b => b.title == book.title && b.author == book.author)
                readList.splice(index, 1)
                allNotes.splice(note, 1)


                UI.addToLocalStorage(allNotesKey, allNotes)
                UI.addToLocalStorage(readListKey, readList)
            }
            else if (target.classList.contains('unreadList')) {
                const book = unReadList.find(b => b.title == title && b.author == author);
                index = unReadList.findIndex(b => b.title == book.title && b.author == book.author)
                unReadList.splice(index, 1)
                UI.addToLocalStorage(unreadListKey, unReadList)
            }
            else if (target.classList.contains('favoriteList')) {
                const book = favoriteList.find(b => b.title == title && b.author == author);

                note = allNotes.findIndex(n => n.id == book.id);
                index = favoriteList.findIndex(b => b.title == book.title && b.author == book.author)

                favoriteList.splice(index, 1)
                allNotes.splice(note, 1)

                UI.addToLocalStorage(allNotesKey, allNotes)
                UI.addToLocalStorage(favoriteListKey, favoriteList)
            }
            else if (target.classList.contains('recommendedList')) {
                const book = recommendedList.find(b => b.title == title && b.author == author);

                index = recommendedList.findIndex(b => b.title == book.title && b.author == book.author)
                recommendedList.splice(index, 1)
                UI.addToLocalStorage(recommendedListKey, recommendedList)
            }
            else if (target.classList.contains('avalibleRecommendations')) {
                const book = avalibleRecommendations.find(b => b.title == title && b.author == author);

                index = avalibleRecommendations.findIndex(b => b.title == book.title && b.author == book.author)
                avalibleRecommendations.splice(index, 1)


                UI.addToLocalStorage(avalibleRecommendationsKey, avalibleRecommendations)
            }
            row.remove()
        }
    }

    static moveBook(target, listTypeFrom, listTypeTo, targetClass) {
        if (target.classList.contains(`${targetClass}`)) {
            const row = target.closest('tr')
            const title = row.querySelector('.titleTdBox').textContent.trim()
            const author = row.querySelector('.authorTd').textContent.trim()

            const book = new Book(title, author, Date.now())

            const index = listTypeFrom.findIndex(b => b.title == book.title && b.author == book.author);

            listTypeFrom.splice(index, 1)




            listTypeTo.push(book)
            row.remove()
        }
    }


    static recommendBook() {
        const formTitle = document.getElementById('formTitile').value
        const formAuthor = document.getElementById('formAuthor').value

        if (formAuthor === '') {
            return

        } else {
            const cleanFormTitle = formTitle.toLowerCase().replace(/\s+/g, '')
            const cleanFormAuthor = formAuthor.toLowerCase().replace(/\s+/g, '')

            for (const recommBook of avalibleRecommendations) {
                const cleanRecommBookAuthor = recommBook.author.toLowerCase().replace(/\s+/g, '')
                if (cleanFormAuthor === cleanRecommBookAuthor) {
                    const title = recommBook.title
                    const author = recommBook.author



                    const book = new Book(title, author)

                    const cleanTitle = title.toLowerCase().replace(/\s+/g, '')
                    const cleanAuthor = author.toLowerCase().replace(/\s+/g, '')


                    if (cleanFormTitle === cleanTitle && cleanFormAuthor === cleanAuthor) {
                        const indexOfbook = avalibleRecommendations.findIndex(b => b.author === book.author)
                        avalibleRecommendations.splice(indexOfbook, 1)
                        UI.addToLocalStorage(avalibleRecommendationsKey, avalibleRecommendations)
                    } else {
                        recommendedList.push(book)

                        UI.addToLocalStorage(recommendedListKey, recommendedList)

                        const indexOfbook = avalibleRecommendations.findIndex(b => b.author === book.author)
                        avalibleRecommendations.splice(indexOfbook, 1)
                        UI.addToLocalStorage(avalibleRecommendationsKey, avalibleRecommendations)
                    }

                    // console.log(book);



                    return
                }

            }

        }
    }

    static moveToRead(target) {
        UI.moveBook(target, unReadList, readList, 'moveToRead')
        UI.addToLocalStorage(unreadListKey, unReadList)
        UI.addToLocalStorage(readListKey, readList)

    }

    static moveToFavorite(target) {
        if (target.classList.contains(`addToFavoriteBtn`)) {
            const row = target.closest('tr')
            const title = row.querySelector('.titleTdBox').textContent.trim()
            const author = row.querySelector('.authorTd').textContent.trim()

            const book = readList.find(b => b.title == title && b.author == author);
            const index = readList.findIndex(b => b.title == book.title && b.author == book.author);

            readList.splice(index, 1)




            favoriteList.push(book)
            row.remove()
        }
        UI.addToLocalStorage(readListKey, readList)
        UI.addToLocalStorage(favoriteListKey, favoriteList)
    }

    static removeFromFavorite(target) {
        if (target.classList.contains(`removeFromFavorite`)) {
            const row = target.closest('tr')
            const title = row.querySelector('.titleTdBox').textContent.trim()
            const author = row.querySelector('.authorTd').textContent.trim()

            const book = favoriteList.find(b => b.title == title && b.author == author);
            const index = favoriteList.findIndex(b => b.title == book.title && b.author == book.author);

            favoriteList.splice(index, 1)




            readList.push(book)
            row.remove()
        }
        // UI.moveBook(target, favoriteList, readList, 'removeFromFavorite')
        UI.addToLocalStorage(favoriteListKey, favoriteList)
        UI.addToLocalStorage(readListKey, readList)
    }

    static moveFromRecommendedToUnread(target) {
        UI.moveBook(target, recommendedList, unReadList, 'actionBtn')
        UI.addToLocalStorage(recommendedListKey, recommendedList)
        UI.addToLocalStorage(unreadListKey, unReadList)
    }

    static moveFromRecommendedToRead(target) {
        UI.moveBook(target, recommendedList, readList, 'addToReadFromRecommended')
        UI.addToLocalStorage(recommendedListKey, recommendedList)
        UI.addToLocalStorage(readListKey, readList)
    }

    static clearFields() {
        document.getElementById('formTitile').value = ''
        document.getElementById('formAuthor').value = ''


    }

    static updateCurrentPage(newPage) {
        currentPage = newPage;
        localStorage.setItem('currentPage', currentPage);
        pageCounter.innerHTML = `Strana ${currentPage + 1}`;
    }


    static chooseATable(target) {
        if (target.tagName !== 'A') {
            return
        } else {
            document.querySelectorAll('.chosenTable')
                .forEach(el => el.classList.remove('chosenTable'));
            target.classList.add('chosenTable');
        }


    }

    static eventListener(btn, btnType, listType, btnTypeClass, deleteBtnLocation, recommendedBtn, toggleFavoriteClass, starFill) {
        btn.addEventListener('click', () => {
            const title = document.getElementById('formTitile').value
            const author = document.getElementById('formAuthor').value


            if (!title || !author) {
                alert('Please fill in both the title and author fields.');
                return;
            }

            const book = new Book(title, author, Date.now())

            const bookCheckRead = readList.some(b => b.title === book.title && b.author === book.author)
            const bookCheckUnRead = unReadList.some(b => b.title === book.title && b.author === book.author)
            const bookCheckFavorite = favoriteList.some(b => b.title === book.title && b.author === book.author)

            if (bookCheckRead) {
                alert('This book already exists in "Read Books" list')
                UI.clearFields()
                return
            } else if (bookCheckUnRead) {
                alert('This book already exists in "Want To Read" list')
                UI.clearFields()
                return
            } else if (bookCheckFavorite) {
                alert('This book already exists in "Favorite" list')
                UI.clearFields()
                return
            }

            const currentNav = document.querySelector(`a[data-list="${listType === readList ? 'readList' : 'unreadList'}"]`)
            if (currentNav.classList.contains('chosenTable')) {
                const list = document.getElementById('book-list')
                const row = document.createElement('tr')
                this.addInnerHtML(row, btnType, book, btnTypeClass, deleteBtnLocation, recommendedBtn, toggleFavoriteClass, starFill)
                list.appendChild(row)

            }



            UI.addBookToList(book, listType)
            UI.recommendBook()


            if (listType === readList) {
                UI.addToLocalStorage(readListKey, readList)
            } else {
                UI.addToLocalStorage(unreadListKey, unReadList)
            }

            UI.clearFields()
        })
    }

    static tutorialHandeler() {
        openTutorial.addEventListener('click', () => {
            tutorialOverLay.style.visibility = 'visible'
        })

        tutorialXBox.addEventListener('click', () => {
            localStorage.setItem('tutorialXBoxClicked', 'true')
            tutorialOverLay.style.visibility = 'hidden'
        })

        if (localStorage.getItem('tutorialXBoxClicked') === 'true') {
            tutorialOverLay.style.visibility = 'hidden'
        } else {
            tutorialOverLay.style.visibility = 'visible'
        }
    }

    static notesHandeler() {
        xBtn.addEventListener('click', () => {
            note.list[currentPage] = text.value;
            localStorage.setItem(allNotesKey, JSON.stringify(allNotes));
            text.value = note.list[currentPage];
            notesOverlay.style.visibility = 'hidden'
        })

        pagePlus.addEventListener("click", () => {
            note.list[currentPage] = text.value;
            localStorage.setItem(allNotesKey, JSON.stringify(allNotes));

            currentPage = (currentPage + 1) % 50;

            localStorage.setItem('currentPage', currentPage);

            text.value = note.list[currentPage];

            pageCounter.innerHTML = `Strana ${currentPage + 1}`;
        });

        pageMinus.addEventListener("click", () => {
            note.list[currentPage] = text.value;
            localStorage.setItem(allNotesKey, JSON.stringify(allNotes));

            currentPage = (currentPage - 1 + 50) % 50;

            localStorage.setItem('currentPage', currentPage);

            text.value = note.list[currentPage];

            pageCounter.innerHTML = `Strana ${currentPage + 1}`;
        });
    }

    static manageNotes(target, listType) {
        const row = target.closest('tr');
        const title = row.querySelector('.titleTdBox').textContent.trim();
        const author = row.querySelector('.authorTd').textContent.trim();

        currentPage = 0

        const book = listType.find(b => b.title == title && b.author == author);

        note = allNotes.find(n => n.id == book.id);

        if (!note) {
            const newNote = new Notes(book.id);
            allNotes.push(newNote);
            localStorage.setItem(allNotesKey, JSON.stringify(allNotes));
        }

        note = allNotes.find(n => n.id == book.id);

        if (text.value.trim() !== '') {

            if (note.id !== book.id) {

                note.list[currentPage] = text.value.trim();

                localStorage.setItem(allNotesKey, JSON.stringify(allNotes));

            }
        }

        text.value = note.list[currentPage];

        pageCounter.innerHTML = `Strana ${currentPage + 1}`;

        notesOverlay.style.visibility = 'visible';
    }
}

const readListKey = 'readListKey'
let readList = []

const unreadListKey = 'unreadListKey'
let unReadList = []

const favoriteListKey = 'favoriteListKey'
let favoriteList = []

const recommendedListKey = 'recommendedListKey'
let recommendedList = []

const avalibleRecommendationsKey = 'avalibleRecommendationsKey'
let avalibleRecommendations = []

const allNotesKey = 'allNotes'
let allNotes = []





if (localStorage.getItem(avalibleRecommendationsKey)) {
    UI.getFromLocalStorage(avalibleRecommendationsKey, avalibleRecommendations);
} else {
    UI.bookFetch('books.json').then(() => {
        UI.addToLocalStorage(avalibleRecommendationsKey, avalibleRecommendations);
    });
}



UI.getFromLocalStorage(readListKey, readList)
UI.getFromLocalStorage(unreadListKey, unReadList)
UI.getFromLocalStorage(favoriteListKey, favoriteList)
UI.getFromLocalStorage(recommendedListKey, recommendedList)

UI.defoultListShow()

const xBtn = document.getElementById('x')
const notesOverlay = document.querySelector('.notesOverlay')
const notesOverlayBox = document.querySelector('.notesOverlayBox')
const text = document.getElementById('text')
const pagePlus = document.getElementById('pagePlus')
const pageMinus = document.getElementById('pageMinus')
const pageCounter = document.querySelector('.pageCounter')
const tutorialOverLay = document.getElementById('tutorialOverlay')
const tutorialXBox = document.getElementById('tutorialXBox')
const openTutorial = document.getElementById('openTutorial')
let pages
let currentPage = localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')) : 0;
let note


UI.tutorialHandeler()
UI.notesHandeler()


UI.playAndMuteBacgroundMusic()

const addToReadBtn = document.getElementById('addToReadBtn')
const addToUnreadBtn = document.getElementById('addToUnreadBtn')

UI.eventListener(addToReadBtn, 'Add Notes', readList, 'addNotes', 'readList', '', 'addToFavoriteBtn', 'C0C0C0')
UI.eventListener(addToUnreadBtn, 'Move to Read', unReadList, 'moveToRead', 'unReadList', '', 'transparent')
UI.getFromLocalStorage(allNotesKey, allNotes);

document.getElementById('book-list').addEventListener('click', e => {


    if (e.target.classList.contains('moveToRead')) {
        UI.moveToRead(e.target)
    }

    if (e.target.classList.contains('delete')) {
        UI.deleteBook(e.target)
    }

    if (e.target.classList.contains('addToFavoriteBtn')) {
        UI.moveToFavorite(e.target)
    }

    if (e.target.classList.contains('removeFromFavorite')) {
        UI.removeFromFavorite(e.target)
    }

    if (e.target.classList.contains('actionBtn')) {
        UI.moveFromRecommendedToUnread(e.target)
    }

    if (e.target.classList.contains('addToReadFromRecommended')) {
        UI.moveFromRecommendedToRead(e.target)
    }

    if (e.target.classList.contains('addNotes')) {
        UI.manageNotes(e.target, readList)
    }

    if (e.target.classList.contains('addNotesFavorite')) {
        UI.manageNotes(e.target, favoriteList)
    }

    e.preventDefault()
})

document.getElementById('navigation').addEventListener('click', e => {
    // console.log(e.target);
    UI.chooseATable(e.target)
    if (e.target.tagName === 'A') {
        const listType = e.target.dataset.list
        const table = document.getElementById('book-list')


        table.innerHTML = ''


        let btnTypeClass
        let btnType
        let selectedList
        let deleteBtnLocation
        let starFill
        let toggleFavoriteClass
        let recommendedBtn

        if (listType === 'readList') {
            selectedList = readList
            btnType = 'Add Notes'
            btnTypeClass = 'addNotes'
            deleteBtnLocation = 'readList'
            starFill = 'C0C0C0'
            toggleFavoriteClass = 'addToFavoriteBtn'
            recommendedBtn = ''

        }
        else if (listType === 'unreadList') {
            selectedList = unReadList
            btnType = 'Move to read'
            btnTypeClass = 'moveToRead'
            deleteBtnLocation = 'unreadList'
            starFill = 'transparent'
            recommendedBtn = ''
        }
        else if (listType === 'favoriteList') {
            selectedList = favoriteList
            btnType = 'Add Notes'
            btnTypeClass = 'addNotesFavorite'
            deleteBtnLocation = 'favoriteList'
            starFill = 'fad60d'
            toggleFavoriteClass = 'removeFromFavorite'
            recommendedBtn = ''
        }
        else if (listType === 'recommendedList') {
            let btnTypeClassReccom = 'addToReadFromRecommended'
            btnType = 'Add to Unread'
            btnTypeClass = 'actionBtn recommBtn'
            selectedList = recommendedList
            starFill = 'transparent'
            deleteBtnLocation = 'recommendedList'
            toggleFavoriteClass = ''
            recommendedBtn = `<button class="${btnTypeClassReccom} recommBtn">Add to Read</button>`
        }

        selectedList.forEach(book => {
            const row = document.createElement('tr')
            UI.addInnerHtML(row, btnType, book, btnTypeClass, deleteBtnLocation, recommendedBtn, toggleFavoriteClass, starFill)
            table.appendChild(row)
        });

        e.preventDefault()
    }
})

document.getElementById('libraryForm').addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault()
    }
})





// localStorage.clear()


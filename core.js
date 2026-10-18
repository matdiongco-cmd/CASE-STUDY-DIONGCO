// ---------- Keys ----------
const BOOKSHELF_KEY = "BOOKSHELF_KEY"
const LOGIN_KEY = "LOGIN_INFO"          // written by the register script
const RETURNED_KEY = "RETURNED_COUNT"   // running total of returned books

// A global editable inventory array for content
let Bookshelf = JSON.parse(localStorage.getItem(BOOKSHELF_KEY)) ?? []

// ---------- Shortcuts ----------
function modify(id, innerHTML) {
  document.getElementById(id).innerHTML = innerHTML
}

function retrieve(id) {
  return document.getElementById(id)
}

function getinner(id) {
  return retrieve(id).value
}

function save() {
  localStorage.setItem(BOOKSHELF_KEY, JSON.stringify(Bookshelf))
}

// A global variable for the library inventory table
const LibraryInventory = retrieve("BookstoreTable")

// A global variable for the titles
const LibraryTitles = LibraryInventory.innerHTML

// ---------- Stat cards ----------
function isBorrowed(book) {
  const p = (book.personBorrowed ?? "").trim()
  return p !== "" && p !== "Not Borrowed"
}

function getReturnedCount() {
  return Number(localStorage.getItem(RETURNED_KEY)) || 0
}

function updateStats() {
  const accounts = JSON.parse(localStorage.getItem(LOGIN_KEY)) ?? []

  const total = Bookshelf.length
  const borrowed = Bookshelf.filter(isBorrowed).length
  const available = total - borrowed
  const returned = getReturnedCount()
  const pct = total ? Math.round((borrowed / total) * 100) : 0

  // Each .stat-change is the <p> right under its value
  function setStat(id, value, note) {
    const el = retrieve(id)
    if (!el) return
    el.textContent = value.toLocaleString()
    if (el.nextElementSibling) el.nextElementSibling.textContent = note
  }

  setStat("statBorrowed", borrowed, `${pct}% of all books`)
  setStat("statBooks", total, `${available} available`)
  setStat("statReturned", returned, "All time")
  setStat("statLibrarians", accounts.length, "Registered accounts")
}

// ---------- Table ----------
// Cell order matches the <th> order: Control No., Author, Title, ...
function createField(info) {
  return `
    <tr>
      <td>${info.bookControlNumber}</td>
      <td>${info.bookAuthor}</td>
      <td>${info.bookTitle}</td>
      <td>${info.personBorrowed}</td>
      <td>${info.lendor}</td>
      <td>${info.borrowStartDate}</td>
      <td>${info.borrowEndDate}</td>
      <td>
        <input type="button" onclick="onEdit('${info.bookControlNumber}')" value="Edit">
        <input type="button" onclick="onDelete('${info.bookControlNumber}')" value="Delete">
      </td>
    </tr>
  `
}

function updateTableContent() {
  let rows = ""
  for (let i = 0; i < Bookshelf.length; i++) {
    rows += createField(Bookshelf[i])
  }
  LibraryInventory.innerHTML = LibraryTitles + rows
  updateStats()
}

// ---------- Edit / Delete / Add ----------
function onEdit(w) {
  const info = Bookshelf.find(b => b.bookControlNumber === w)
  if (!info) return

  for (const [k, v] of Object.entries(info)) {
    const el = retrieve(k)
    if (el) el.value = v ?? ""
  }
}

function onDelete(w) {
  const i = Bookshelf.findIndex(b => b.bookControlNumber === w)
  if (i === -1) return

  Bookshelf.splice(i, 1)
  updateTableContent()
  save()
}

function OnAdd() {
  const w = getinner("bookControlNumber").trim()
  if (!w) {
    alert("Book Control Number is required.")
    return
  }

  const index = Bookshelf.findIndex(b => b.bookControlNumber === w)

  const updatecontent = {
    bookControlNumber: w,
    bookTitle: getinner("bookTitle"),
    bookAuthor: getinner("bookAuthor"),
    personBorrowed: getinner("personBorrowed") || "Not Borrowed",
    lendor: getinner("lendor") || "No Lendor",
    borrowStartDate: getinner("borrowStartDate") || "No Date Yet",
    borrowEndDate: getinner("borrowEndDate") || "No Date Yet"
  }

  if (index === -1) {
    Bookshelf.push(updatecontent)
  } else {
    // Borrowed -> Not Borrowed counts as a return
    if (isBorrowed(Bookshelf[index]) && !isBorrowed(updatecontent)) {
      localStorage.setItem(RETURNED_KEY, getReturnedCount() + 1)
    }
    Bookshelf[index] = updatecontent
  }

  updateTableContent()
  save()
}

updateTableContent()
modify("welcomeName", `Welcome home! ${localStorage.getItem("Username")}`)

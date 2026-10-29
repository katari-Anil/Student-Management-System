
const STORAGE_KEY = "studentManagementRecords";

function getStudents() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveStudents(students) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

// Student registration
const studentForm = document.getElementById("studentForm");

if (studentForm) {
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const roll = document.getElementById("roll").value.trim();
        const department = document.getElementById("department").value;
        const email = document.getElementById("email").value.trim();

        const students = getStudents();

        const exists = students.some(
            student => student.roll.toLowerCase() === roll.toLowerCase()
        );

        if (exists) {
            document.getElementById("message").textContent =
                "Roll number already exists!";
            return;
        }

        students.push({
            name,
            roll,
            department,
            email
        });

        saveStudents(students);

        document.getElementById("message").textContent =
            "Student registered successfully!";

        studentForm.reset();
    });
}

// Display student records
const studentTable = document.getElementById("studentTable");

if (studentTable) {
    displayStudents();
}

function displayStudents() {
    const students = getStudents();
    const table = document.getElementById("studentTable");
    const emptyMessage = document.getElementById("emptyMessage");

    table.innerHTML = "";

    emptyMessage.style.display = students.length ? "none" : "block";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        [student.name, student.roll, student.department, student.email]
            .forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function () {
            deleteStudent(index);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        table.appendChild(row);
    });
}

function deleteStudent(index) {
    const students = getStudents();

    students.splice(index, 1);

    saveStudents(students);
    displayStudents();
}

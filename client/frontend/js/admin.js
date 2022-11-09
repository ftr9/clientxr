const formElement = document.querySelector('#form_admin');
const adminForm = document.querySelector('#form');
const studentForm = document.querySelector('.studentsForm');
const errorMessageElement = document.querySelector('.error-message');

formElement.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMessageElement.hidden = true;
  const key = document.querySelector('input[type="password"]');

  try {
    const response = await axios.post('/admin/key', {
      secretKey: key.value,
    });
    if (response.data.status === 'success') {
      adminForm.hidden = true;
      studentForm.hidden = false;
      await fetchAllStudents();
      attachDeleteEvent();
    } else {
      errorMessageElement.hidden = false;
      setTimeout(() => {
        errorMessageElement.hidden = true;
      }, 2000);
    }
  } catch (err) {
    alert('something went wrong');
  }
});

async function attachDeleteEvent() {
  const deleteButtons = document.querySelectorAll('.deleteStudent');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', async () => {
      deleteButton.textContent = 'deleting please wait ...';
      const studentId = deleteButton.getAttribute('studentId');
      await axios.delete(`/admission/students/${studentId}`);
      const parentFormNode = deleteButton.parentNode.parentNode;
      parentFormNode.removeChild(deleteButton.parentNode);
    });
  });
}

async function fetchAllStudents() {
  const admittedStudents = await axios.get('/admission/students');
  if (admittedStudents.data.length === 0) {
    alert('not students registered yet....');
  } else {
    admittedStudents.data.forEach((student) => {
      studentForm.insertAdjacentHTML(
        'beforeend',
        `
        <div class="studentsFormCont">
        <header class="studentsFormCont_header">
          <div class="studentsFormCont_header_image">
            <img src="./img/uploads/${student.profilePicName}" alt="profile" ></img>
          </div>
          <div>
            <div class="studentsFormCont_info">
              <span class="studentsFormCont_info_primaryText">Gender</span
              ><span class="studentsFormCont_info_divider"></span
              ><span class="studentsFormCont_info_secondaryText">${student.gender}</span>
            </div>
            <div class="studentsFormCont_info">
              <span class="studentsFormCont_info_primaryText">Phone</span
              ><span class="studentsFormCont_info_divider"></span
              ><span class="studentsFormCont_info_secondaryText"
                >${student.studentPhone}</span
              >
            </div>
          </div>
        </header>
        <div class="studentsFormCont_info">
          <span class="studentsFormCont_info_primaryText">Name</span
          ><span class="studentsFormCont_info_divider"></span
          ><span class="studentsFormCont_info_secondaryText"
            >${student.studentName}</span
          >
        </div>
        <div class="studentsFormCont_info">
          <span class="studentsFormCont_info_primaryText">Program</span
          ><span class="studentsFormCont_info_divider"></span
          ><span class="studentsFormCont_info_secondaryText"
            >${student.program}</span
          >
        </div>
        <div class="studentsFormCont_info">
          <span class="studentsFormCont_info_primaryText">Guardian</span
          ><span class="studentsFormCont_info_divider"></span
          ><span class="studentsFormCont_info_secondaryText"
            >${student.parentName}</span
          >
        </div>
        <div class="studentsFormCont_info">
          <span class="studentsFormCont_info_primaryText">phone</span
          ><span class="studentsFormCont_info_divider"></span
          ><span class="studentsFormCont_info_secondaryText">${student.parentPhone}</span>
        </div>
        <div class="studentsFormCont_marksheet">
          <div class="studentsFormCont_info">marksheet grade 11</div>
          <div class="studentsFormCont_info">marksheet grade 12</div>
        </div>
        <div class="studentsFormCont_marksheet_images">
          <div class="studentsFormCont_marksheet_image">
             <img src="./img/uploads/${student.marksheet11Name}"  alt="marksheet grade 11"></img>
          </div>

          <div class="studentsFormCont_marksheet_image">
            <div class="studentsFormCont_marksheet_image">
             <img src="./img/uploads/${student.marksheet12Name}"  alt="marksheet grade 12"></img>
          </div>
          </div>
        </div>
         <button studentId="${student.id}"  class="deleteStudent" style="width:100%;" >Delete</button>
      </div>
        
        `,
      );
    });
  }
}

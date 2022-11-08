window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.entrance_form');
  const formElements = form.elements;
  const formData = new FormData();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formData.set('gender', formElements.gender.value);
    submitForm();
  });

  const submitForm = async () => {
    try {
      const result = await axios.post('/admission', formData);
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fileChangeHandle = (inputFieldName) => {
    return (e) => {
      formData.set(inputFieldName, e.target.files[0]);
    };
  };

  const inputChangeHandle = (inputFieldName) => {
    return (e) => {
      formData.set(inputFieldName, e.target.value);
    };
  };

  //inputs
  formElements.studentName.addEventListener(
    'change',
    inputChangeHandle('studentName'),
  );
  formElements.studentPhone.addEventListener(
    'change',
    inputChangeHandle('studentPhone'),
  );
  formElements.studentAddress.addEventListener(
    'change',
    inputChangeHandle('studentAddress'),
  );
  formElements.studentEmail.addEventListener(
    'change',
    inputChangeHandle('studentEmail'),
  );
  formElements.program.addEventListener('change', inputChangeHandle('program'));
  formElements.parentName.addEventListener(
    'change',
    inputChangeHandle('parentName'),
  );
  formElements.parentPhone.addEventListener(
    'change',
    inputChangeHandle('parentPhone'),
  );

  //files
  formElements.profilePicName.addEventListener(
    'change',
    fileChangeHandle('profilePicName'),
  );
  formElements.marksheet11Name.addEventListener(
    'change',
    fileChangeHandle('marksheet11Name'),
  );
  formElements.marksheet12Name.addEventListener(
    'change',
    fileChangeHandle('marksheet12Name'),
  );
});

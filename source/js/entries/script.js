import { STORAGE_FLAG } from '../const';

// Блокирование сабмита невалидной формы и сохранение вводимой информации
const forms = document.querySelectorAll(`form`);

const revalidateForm = (form) => {
	const btn = form.querySelector(`form button[type="submit"]`);
	if (form.checkValidity()) {
		btn.removeAttribute(`disabled`);
		btn.setAttribute(`title`, `Форма заполнена верно, можно отправлять!`);
	} else {
		btn.setAttribute(`disabled`, true);
		btn.setAttribute(`title`, `Форма заполнена неправильно!`);
	}
};

for (let i = 0; i < forms.length; i++) {
	((form) => {
		const fields = form.querySelectorAll(`[name]`);
		for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
			((field) => {
				const name = field.getAttribute(`name`);
				if (!field.value && STORAGE_FLAG) {
					field.value = localStorage.getItem(name);
				}

				const fieldServ = () => {
					field.value = field.value.trim();
					if (STORAGE_FLAG) {
						localStorage.setItem(name, field.value);
					}
					revalidateForm(form);
				};
				field.onkeyup = fieldServ;
				field.onblur = fieldServ;
			})(fields[fieldIndex]);
		}
		revalidateForm(form);
	})(forms[i]);
}

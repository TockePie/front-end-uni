document.addEventListener("DOMContentLoaded", () => {
  const validator = new FormValidator("userForm", "output");
  validator.init();

  new Grid6x6("grid6x6", "colorPicker", "variantCell", "resetBtn");
});

class FormValidator {
  constructor(formId, outputId) {
    this.form = document.getElementById(formId);
    this.output = document.getElementById(outputId);
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.validate();
    });
  }

  validate() {
    const fields = {
      pib: this.form.pib,
      variant: this.form.variant,
      group: this.form.group,
      birth: this.form.birth,
      address: this.form.address,
    };

    Helpers.clearErrors(Object.values(fields));
    this.output.innerHTML = "";

    const errors = [];

    if (
      !Helpers.checkField(
        fields.pib,
        /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ][а-яіїєґ']+$/
      )
    )
      errors.push("❌ ПІБ введено неправильно");

    if (fields.variant.value.trim() !== "9") {
      Helpers.showError(fields.variant);
      errors.push("❌ Варіант має бути 9");
    }

    if (
      !Helpers.checkField(
        fields.group,
        /^([А-Я]{2,6}\d{2}|[А-Я]{2}-\d{2}|[А-Я]\.[А-Я]\.)$/i
      )
    )
      errors.push("❌ Група повинна бути у форматі ТТТТТТ22, ТТ-22 або Т.Т.");

    if (!Helpers.checkField(fields.birth, /^\d{2}\.\d{2}\.\d{4}$/))
      errors.push("❌ Дата народження має бути у форматі ЧЧ.ЧЧ.ЧЧЧЧ");

    if (!Helpers.checkField(fields.address, /^м\.\s?[А-ЯІЇЄҐа-яіїєґ]{2,}$/))
      errors.push("❌ Адреса має бути у форматі м. Назва");

    if (errors.length === 0) {
      Helpers.showSuccess(fields, this.output);
    } else {
      Helpers.showErrors(errors, this.output);
    }
  }
}

class Helpers {
  static checkField(input, regex) {
    if (!regex.test(input.value.trim())) {
      this.showError(input);
      return false;
    }
    return true;
  }

  static showError(input) {
    input.classList.add("border-red-500", "bg-red-50");
  }

  static clearErrors(inputs) {
    inputs.forEach((i) => i.classList.remove("border-red-500", "bg-red-50"));
  }

  static showErrors(errors, output) {
    output.innerHTML = `
      <div class="text-red-600 font-semibold p-3 rounded-xl bg-red-100 border border-red-400">
        ${errors.join("<br>")}
      </div>
    `;
  }

  static showSuccess(fields, output) {
    output.innerHTML = `
      <div class="text-green-700 font-semibold p-3 rounded-xl bg-green-100 border border-green-400">
        ✅ Усі дані правильні!
        <br><br>
        <strong>ПІБ:</strong> ${fields.pib.value}<br>
        <strong>Варіант:</strong> ${fields.variant.value}<br>
        <strong>Група:</strong> ${fields.group.value}<br>
        <strong>Дата народження:</strong> ${fields.birth.value}<br>
        <strong>Адреса:</strong> ${fields.address.value}
      </div>
    `;
  }
}

class Grid6x6 {
  constructor(tableId, colorPickerId, variantId, resetBtnId) {
    this.table = document.getElementById(tableId);
    this.colorPicker = document.getElementById(colorPickerId);
    this.variantInput = document.getElementById(variantId);
    this.resetBtn = document.getElementById(resetBtnId);
    this.rows = 6;
    this.cols = 6;
    this._init();
  }

  _init() {
    this._renderGrid();
    this._bindReset();
  }

  _renderGrid() {
    let counter = 1;
    for (let r = 0; r < this.rows; r++) {
      const tr = this.table.insertRow();
      for (let c = 0; c < this.cols; c++) {
        const td = tr.insertCell();
        td.textContent = counter;
        td.style.width = td.style.height = "56px";
        td.style.textAlign = "center";
        td.style.verticalAlign = "middle";
        td.style.cursor = "pointer";
        td.dataset.num = counter;
        td.dataset.locked = "false";

        td.addEventListener("mouseover", () => this._hover(td));
        td.addEventListener("mouseout", () => this._hoverOut(td));
        td.addEventListener("click", () => this._click(td));
        td.addEventListener("dblclick", () => this._dblClick(td));

        td.style.border = "1px solid #cfcfcf";
        counter++;
      }
    }
  }

  _getTargetNumber() {
    return Number(this.variantInput.value);
  }

  _hover(td) {
    if (
      Number(td.dataset.num) === this._getTargetNumber() &&
      td.dataset.locked === "false"
    ) {
      td.dataset._prev = td.style.backgroundColor || "";
      td.style.backgroundColor = this._randomColor();
    }
  }

  _hoverOut(td) {
    if (
      Number(td.dataset.num) === this._getTargetNumber() &&
      td.dataset.locked === "false"
    ) {
      td.style.backgroundColor = td.dataset._prev || "";
      delete td.dataset._prev;
    }
  }

  _click(td) {
    if (Number(td.dataset.num) === this._getTargetNumber()) {
      td.style.backgroundColor = this.colorPicker.value;
      td.dataset.locked = "true";
    }
  }

  _dblClick(td) {
    const col = td.cellIndex;
    const startRow = td.parentNode.rowIndex;
    const color = this.colorPicker.value;
    for (let r = startRow; r < this.rows; r += 2) {
      const cell = this.table.rows[r].cells[col];
      cell.style.backgroundColor = color;
      cell.dataset.locked = "true";
    }
  }

  _randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 75%)`;
  }

  _bindReset() {
    this.resetBtn.addEventListener("click", () => {
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          const td = this.table.rows[r].cells[c];
          td.style.backgroundColor = "";
          td.dataset.locked = "false";
        }
      }
    });
  }
}

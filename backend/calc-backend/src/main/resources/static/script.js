// Si sirves el frontend por separado (Live Server/Vite), deja esto:
const API = "";

// Si sirves el frontend DESDE Spring Boot (carpeta static), usa ruta relativa:
// const API = ""; // mismo origen, no hace falta host

// Elementos UI
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const result = document.getElementById("result");
const historyList = document.getElementById("history");
const clearBtn = document.getElementById("clear-history");
const opButtons = document.querySelectorAll("[data-op]");
const equalsBtn = document.getElementById("equals");
const opDisplay = document.getElementById("op-display");
const msg = document.getElementById("msg");

// Estado
let selectedOp = null;

// --- API ---
async function callApi(op, a, b) {
  const res = await fetch(`${API}/api/calc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ op, a: Number(a), b: Number(b) })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Error inesperado");
  return data; // { expression, result, error }
}

async function loadRemoteHistory() {
  try {
    const res = await fetch(`${API}/api/calc/history`);
    const list = await res.json();
    historyList.innerHTML = "";
    list.forEach(expr => appendHistory(expr));
  } catch {
    // si falla no bloqueamos
  }
}

async function clearRemoteHistory() {
  await fetch(`${API}/api/calc/history`, { method: "DELETE" });
}

// --- UI helpers ---
function appendHistory(expr) {
  const li = document.createElement("li");
  li.textContent = expr;
  historyList.appendChild(li);
}

function showMessage(text = "") { msg.textContent = text; }

function updateEqualsState() {
  const valid = selectedOp && num1.value !== "" && num2.value !== "";
  equalsBtn.disabled = !valid;
}

function setSelectedOp(op) {
  selectedOp = op;
  opButtons.forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  const btn = Array.from(opButtons).find(b => b.dataset.op === op);
  if (btn) {
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
  }
  opDisplay.textContent = op || "—";
  showMessage("");
  updateEqualsState();
}

function clearSelectedOp() {
  selectedOp = null;
  opButtons.forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  opDisplay.textContent = "—";
  updateEqualsState();
}

// --- Eventos ---
opButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const op = btn.dataset.op;
    if (selectedOp === op) {
      clearSelectedOp();
    } else {
      setSelectedOp(op);
    }
  });
});

[num1, num2].forEach(input => {
  input.addEventListener("input", () => {
    showMessage("");
    updateEqualsState();
  });
});

equalsBtn.addEventListener("click", async () => {
  if (!selectedOp) return showMessage("Selecciona una operación");
  if (num1.value === "" || num2.value === "") return showMessage("Ingresa ambos números");

  try {
    equalsBtn.disabled = true;
    const data = await callApi(selectedOp, num1.value, num2.value);
    result.textContent = data.result;
    appendHistory(data.expression);
    showMessage("");
  } catch (err) {
    result.textContent = "—";
    showMessage(err.message);
  } finally {
    updateEqualsState();
  }
});

clearBtn.addEventListener("click", async () => {
  try {
    await clearRemoteHistory();
    historyList.innerHTML = "";
    showMessage("Historial limpiado");
  } catch {
    showMessage("No se pudo limpiar el historial");
  }
});

// Teclado: selecciona operación, Enter ejecuta, Esc limpia selección
document.addEventListener("keydown", (e) => {
  if (["+","-","*","/"].includes(e.key)) {
    e.preventDefault();
    setSelectedOp(e.key);
  }
  if (e.key === "Enter") {
    e.preventDefault();
    if (!equalsBtn.disabled) equalsBtn.click();
  }
  if (e.key === "Escape") {
    e.preventDefault();
    clearSelectedOp();
  }
});

// Inicial
document.addEventListener("DOMContentLoaded", loadRemoteHistory);
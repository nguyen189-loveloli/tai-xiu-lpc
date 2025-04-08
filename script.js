// Cập nhật số dư ban đầu nếu cần (demo)
let userBalance = 100;

function updateBalance() {
  document.getElementById("balance").innerText = userBalance;
}

function playGame(choice) {
  const bet = parseInt(document.getElementById("bet").value);
  if (!bet || bet <= 0) {
    alert("Vui lòng nhập số LPC cược hợp lệ.");
    return;
  }
  if (bet > userBalance) {
    alert("Số dư không đủ!");
    return;
  }
  
  // Tung 3 viên xúc xắc
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const d3 = Math.floor(Math.random() * 6) + 1;
  const total = d1 + d2 + d3;
  
  // Quy tắc: 3-10 là Xỉu, 11-18 là Tài
  const result = (total <= 10) ? "xỉu" : "tài";
  const win = (result === choice);
  
  // Cập nhật số dư LPC (thắng cộng, thua trừ)
  userBalance = win ? userBalance + bet : userBalance - bet;
  
  // Hiển thị kết quả
  const resText = `
    Bạn cược: ${bet} LPC<br>
    Bạn chọn: ${choice}<br>
    Kết quả xúc xắc: [${d1}, ${d2}, ${d3}] = ${total}<br>
    Kết quả: ${result.toUpperCase()} → ${win ? "Thắng" : "Thua"}<br>
    Số dư mới: ${userBalance} LPC
  `;
  document.getElementById("result").innerHTML = resText;
  addToHistory({
    time: new Date().toLocaleString(),
    bet, choice, total, result, win
  });
  updateBalance();
}

function addToHistory(game) {
  const historyList = document.getElementById("history");
  const li = document.createElement("li");
  li.innerHTML = `<strong>${game.time}</strong>: Cược ${game.bet} LPC, Chọn ${game.choice}, Tổng ${game.total} (${game.result.toUpperCase()}) → ${game.win ? "Thắng" : "Thua"}`;
  historyList.insertBefore(li, historyList.firstChild);
  // Giới hạn lịch sử 10 phần tử
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

updateBalance();

const F = {
    news: [{ title: "Birthday Salute", body: "Order your child's birthday package.", icon: "🎂" }, { title: "School Hours & Drop-Off", body: "Office 7:45am–3:30pm. School 7:45am–2:45pm.", icon: "🚌" }, { title: "Right At School", body: "Sign up for afterschool care.", icon: "🎒" }],
    events: [{ title: "American Education Week", start_date: "Nov 18", time_text: "All day" }, { title: "Robotics Club", start_date: "Nov 19", time_text: "3:15–4:30 PM" }, { title: "Thanksgiving Break – No School", start_date: "Nov 23", time_text: "All week" }],
    staff: [{ name: "Jane Carter", role: "Principal", email: "jcarter@example.edu" }, { name: "Mark Lewis", role: "Assistant Principal", email: "mlewis@example.edu" }, { name: "Sara Nguyen", role: "Counselor", email: "snguyen@example.edu" }],
    gallery: [{ caption: "Spirit Day", icon: "🎉" }, { caption: "Robotics Club", icon: "🤖" }, { caption: "Library Time", icon: "📚" }, { caption: "Field Day", icon: "🏃" }, { caption: "Art Show", icon: "🎨" }, { caption: "Science Fair", icon: "🔬" }]
};
const C = ["#4b3bb5", "#2f6fed", "#19a974", "#f5b83d", "#e4572e", "#17bebb"];
const T = {
    news: (n, i) => `<div class="card"><div class="ph" style="background:${C[i % 6]}">${n.icon || "📰"}</div><h3 style="margin-top:14px">${n.title}</h3><p>${n.body}</p></div>`,
    events: e => `<div class="ev"><b>${e.start_date}</b><div><strong>${e.title}</strong><br><small>${e.time_text}</small></div></div>`,
    staff: s => `<div class="card"><h3>${s.name}</h3><span class="tag">${s.role}</span><p><a href="mailto:${s.email}">${s.email}</a></p></div>`,
    gallery: (g, i) => `<div><div class="ph" style="background:${C[i % 6]}">${g.icon}</div><p style="text-align:center">${g.caption}</p></div>`
};
document.querySelectorAll("[data-list]").forEach(async el => {
    const k = el.dataset.list; let d;
    try { const r = await fetch("api.php?a=" + k); d = await r.json(); if (!Array.isArray(d) || !d.length) throw 0 } catch (e) { d = F[k] }
    if (el.dataset.max) d = d.slice(0, +el.dataset.max); el.innerHTML = d.map(T[k]).join("")
});
document.querySelectorAll("form[data-act]").forEach(f => f.onsubmit = async e => {
    e.preventDefault();
    try { await fetch("api.php?a=" + f.dataset.act, { method: "POST", body: new FormData(f) }) } catch (x) { }
    f.innerHTML = '<div class="ok">✔ Thank you! Your message was received.</div>'
});
document.querySelector(".burger").onclick = () => document.querySelector(".menu").classList.toggle("open");

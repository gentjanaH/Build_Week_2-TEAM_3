//funzione nascondi elementi
const hideSection = function (e) {
    console.log("sezione nascosta", e)

    const section = document.getElementById("carouselExampleAutoplaying")
    const button = e.target

    if (section.classList.contains("d-none")) {
        section.classList.remove("d-none")
        button.innerText = "Nascondi annunci"
    } else {
        section.classList.add("d-none")
        button.innerText = "Mostra novità"
    }

}
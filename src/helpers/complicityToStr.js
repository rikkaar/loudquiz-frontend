const all = 0
const easy = 1
const normal = 2
const hard = 3

export default function ComplicityToStr(code) {
    switch (code) {
        case 0:
            return "Любые"
        case 1:
            return "Легкие"
        case 2:
            return "Нормальные"
        case 3:
            return "Сложные"
        default:
            return "idk"

    }
}
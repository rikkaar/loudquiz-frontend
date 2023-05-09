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
            return "Что-то ты нахуевертил"
    }
}
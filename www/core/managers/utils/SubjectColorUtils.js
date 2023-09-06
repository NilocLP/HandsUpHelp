class SubjectColorUtils {
    static subjectColorToColorCode(subjectColor) {
        switch (subjectColor) {
            case SubjectColor.BLUE:
                return "#8595FF";
            case SubjectColor.GREEN:
                return "#85FF91";
            case SubjectColor.ORANGE:
                return "#FFC485";
            case SubjectColor.PINK:
                return "#EF85FF";
            case SubjectColor.RED:
                return "#FF8585";
            case SubjectColor.YELLOW:
                return "#FFE985";
            case SubjectColor.CYAN:
                return "#85FBFF";
            default:
                return "#FFF";
        }
    }
}
//# sourceMappingURL=SubjectColorUtils.js.map
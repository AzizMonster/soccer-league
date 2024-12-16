import figlet from "figlet";

export default class FigletHelper {

    displayAsciiArt = (text: string): void => {
        figlet.text(
            text,
            {
                font: 'Doom',
            },
            (err, asciiArt) => {
                if (err) {
                    console.error('Error generating ASCII art: ' + err);
                    return;
            }
            console.log('\x1b[32m', asciiArt, '\x1b[0m');
        });
    };
}
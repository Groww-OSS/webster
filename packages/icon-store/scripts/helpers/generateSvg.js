const fs = require("fs");
const path = require("path");
const svgData = require("./updatedMintIconsSvg.json");
const chalk = require("chalk");

function generateSVG() {
  const { svgs } = svgData;
  svgs.forEach(({ svgString, name }) => {
    const fileName = `${name}.svg`;
    const targetDirectory = "svgs/mint-icons";

    // Ensure the directory exists, create it if it doesn't
    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
      console.log(
        chalk.green("Directory ") +
          chalk.yellow(`${targetDirectory}`) +
          chalk.green(" created.")
      );
    }

    // Update fill attribute values starting with #
    const updatedSVGString = svgString.replace(
      /fill="#([0-9a-fA-F]{3,6})"/g,
      'fill="currentColor"'
    );

    // Write the updated SVG content to a file
    fs.writeFile(
      path.resolve(targetDirectory, fileName),
      updatedSVGString,
      (error) => {
        if (error) {
          console.error(chalk.red("Error writing file:", error));
        } else {
          console.log(chalk.green("SVG file created successfully:", fileName));
        }
      }
    );
  });
}

generateSVG();

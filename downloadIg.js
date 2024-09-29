const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, dumpio: true });
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');

    await page.type('input[name="username"]', 'amrmessedup@gmail.com');
    await page.type('input[name="password"]', 'Amrme$$ed4P');
    await page.click('button[type="submit"]');

    await page.waitForNavigation();

    await page.goto('https://www.instagram.com/download/request');

    try {
        await page.waitForSelector('button[type="button"]', { timeout: 5000, visible: true });
        await page.click('button[type="button"]'); 

        const newPageTarget = await browser.waitForTarget(target => target.url().includes('info_and_permissions'));
        const newPage = await newPageTarget.page();

        await newPage.bringToFront();

        await newPage.waitForSelector('span', { timeout: 5000 });

        await newPage.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span')).filter(span => span.innerText.includes('Download or transfer information'));
            if (spans.length > 0) {
                spans[0].click();
            } else {
                console.error('Download or transfer information span not found.');
            }
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check and click "All available information" div
        const infoDivClicked = await newPage.evaluate(() => {
            const divs = Array.from(document.querySelectorAll('div.x1lliihq'));
            const targetDiv = divs.find(div => div.innerText.includes('All available information'));
            if (targetDiv) {
                targetDiv.click();
                return true; 
            } else {
                return false;
            }
        });

        if (!infoDivClicked) {
            console.log('information div not clicked.');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        const transferDivClicked = await newPage.evaluate(() => {
            const divs = Array.from(document.querySelectorAll('div.x1lliihq'));
            const targetDiv = divs.find(div => div.innerText.includes('Transfer to destination'));
            if (targetDiv) {
                targetDiv.click();
                return true; 
            } else {
                return false; 
            }
        });

        if (!transferDivClicked) {
            console.log('transfer div not clicked.');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        const destDivClicked = await newPage.evaluate(() => {
            const divs = Array.from(document.querySelectorAll('div.x1lliihq'));
            const targetDiv = divs.find(div => div.innerText.includes('Destination'));
            if (targetDiv) {
                targetDiv.click();
                return true; 
            } else {
                return false; 
            }
        });

        if (!destDivClicked) {
            console.log('transfer div not clicked.');
        }

        await newPage.waitForSelector('label', { timeout: 5000 });

        // Find and click the radio button for Google Drive
        const googleDriveClicked = await newPage.evaluate(() => {
            const labels = Array.from(document.querySelectorAll('label'));
            const targetLabel = labels.find(label => label.innerText.includes('Google Drive'));

            if (targetLabel) {
                // Find the input inside the label and click it
                const radioButton = targetLabel.querySelector('input[type="radio"]');
                if (radioButton) {
                    radioButton.click();
                    return true; // Indicate that it was clicked
                }
            }
            return false; // Indicate that it was not found or clicked
        });

        if (!googleDriveClicked) {
            console.log('Google Drive radio button not clicked.');
        }

        await newPage.waitForSelector('span', { timeout: 5000 });

        // Find and click the "Save" button by its text
        const saveButtonClicked = await newPage.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('span'));
            const saveButton = buttons.find(button => button.innerText.includes('Save'));

            if (saveButton) {
                saveButton.click();
                return true; // Indicate that it was clicked
            }
            return false; // Indicate that it was not found or clicked
        });

        if (!saveButtonClicked) {
            console.log('Save button not clicked.');
        }

        await newPage.waitForSelector('span', { timeout: 5000 });

        const nextButtonClicked = await newPage.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('span'));
            const nextButton = buttons.find(button => button.innerText.includes('Next'));

            if (nextButton) {
                nextButton.click();
                return true; 
            }
            return false; 
        });
        
        if (!nextButtonClicked) {
            console.log('Next button not clicked.');
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const connectButtonClicked = await newPage.evaluate(() => {
            console.log("reached");
            const connectButton = newPage.$x('//*[@id="mount_0_0_D0"]/div/div[1]/div/div[3]/div/div/div[2]/div/div/div/div/div/div[5]/div/div[4]/div[3]/div/div/div/div/div/div/div/div');
            console.log(connectButton);
            if (connectButton) {
                console.log('Found the Connect button');
                connectButton.click();
                return true;
            } else {
                console.log('Connect button not found');
                return false;
            }
        });
        

        if (!connectButtonClicked) {
            console.log('Connect button not clicked.');
        }

    } catch (error) {
        console.error('Error:', error);
    }

    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for 30 seconds

    await browser.close(); // Close the browser only after completing the actions on the new tab
})();

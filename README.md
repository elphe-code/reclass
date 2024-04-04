# reclass/
## What is Reclass/ ?

With the upcoming renewal fees in the Namebase marketplace, many users are looking for a user-friendly way to batch-transfer all, or a category, of their names.   

Reclass/ is that tool, allowing first the labeling of all your names, then the transfer either by keyword and/or by expiring month.  It comes into a multi-page formula featuring many filters and search tools.   

Do not lose your names ! Use Reclass/  

## Using
Slideshow tutorial : 
[https://docs.google.com/presentation/d/1pYHBA9pCPv9LHnuCdAJvJinW1gVrRF31_qdqmUGFmmc](https://docs.google.com/presentation/d/1pYHBA9pCPv9LHnuCdAJvJinW1gVrRF31_qdqmUGFmmc)

### Playing with the portfolio (not mandatory)
![Pages Portfolio & Page Bests](/doc/screenshot/page-portfolio-bests.png "Pages Portfolio & Page Bests")
### Tagging the names with categories (recommended)
![Pages Classify & Page Classed](/doc/screenshot/page-classify-classed.png "Pages Classify & Page Classed")
### Generating the list of names to be transferred
![Pages Transfer Analyze](/doc/screenshot/page-transfer-analyze.png "Pages Transfer Analyze")
### Filling the form with the destination wallet and 2FA
![Pages Transfer Infos](/doc/screenshot/page-transfer-infos.png "Pages Transfer Infos")
### Waiting until the script finish
![Pages Transfer Wait](/doc/screenshot/page-transfer-wait.png "Pages Transfer Wait")
### Giving me coffee ☕☕☕
-   Buying me a [**coffee**](https://www.buymeacoffee.com/elphe)   
-   Sending some [**crypto**](https://e.hnsfans.com/address/hs1qlp8vmgj8vg8qa3ej5zhk82vjzxsr4xuwjqaqly)   
-   Investing in .PROUDLY [**domains**](https://porkbun.com/tld/proudly)   
-   Proposing me cool [**contracts**](https://discord.gg/K3GyWuUeyp)   

## Installing

0) Install the script    
   a) Log into your Namebase account with your Google Chrome browser   
   b) Open this URL into your browser: https://www.namebase.io/portfolio  
   c) Right-click and click INSPECT the page  
   d) Go into the SOURCES tab and SNIPPET submenu   
   e) Create the Reclass.js snippet and copy-page this raw JS script in it:    
      https://raw.githubusercontent.com/elphe-code/reclass/main/AppOneFile.js   

1) Activate the script: Right-click on it and click run   
2) First you go to the CLASSIFY page, and you distribute TAGS to your names 
3) Then you go to the CLASSED page, and you check what is in each TAG 
4) Finally you go to the TRANSFER page,  
  a) you choose either TAG, MONTH, or BOTH using the toggle buttons,  
  b) you ANALYZE it (it preloads the list of names) with a click on ANALYZE and wait  
  c) enter your destination WALLET and also your 2FA SECRET (32 uppercase chars found in the authenticator export file)
     otpauth://totp/https%2F%2Fwww.namebase.io:%2F%2Fwww.namebase.io?secret=**NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN**&issuer=https%2F%2Fwww.namebase.io  
  d) and then you click on TRANSFER  
  e) you wait until the animation STOP
5) Check that it works on the Dashboard Transfer page: https://www.namebase.io/manage/transfers#external   
6) Finally, optionally, you go to the ABOUT page and buy me 👩🏼‍💻 a coffee ☕!

Restart at step 1 for the next tag, the next month, or the next 3 months   


## Warning

=> Please use it with a recent Chrome browser - **all other browsers are untested**.  
=> Please test with tags and non-important names first.  
=> Ensure the destination wallet is right - there is no turning back.  
=> Please reload completely the script to prepare a second batch of names.  
=> By using this script you agree that I am not responsible for any problem with the names or the transfer process.  



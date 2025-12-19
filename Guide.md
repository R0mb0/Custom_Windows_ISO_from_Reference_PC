# Guide

## 1. Requirements

- Know how to access the bios settings of targhet pc
- Two USB sticks (unless 16Gb)
- A sheet of paper
- A pen
- Rufus too:
  - ` choco install rufus `
  - [Rufus](https://rufus.ie/en/)
- Windows installation image
  - [Windows](https://www.microsoft.com/en-us/software-download/windows11)

## 2. Flash windows 10 image into the USB stick

1. Connect the first USB stick in the pc
2. Open rufus
3. Select the correct USB stick
   - [![1.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/1.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/1.png)
5. Select Windows 11 ISO
   - [![2.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/2.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/2.png)
6. Set your bios boot partition format (if the tharghet pc uses UEFI the partition table is GPT)
   - [![3.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/3.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/3.png)
7. Check if the file system is NTFS
   - [![4.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/4.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/4.png)
8. Others options that you can set in case of Windows image ISO
   - [![5.png](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/5.png?raw=true)](https://github.com/R0mb0/Custom_Windows_ISO_from_Reference_PC/blob/main/Imgs/5.png)
  
## 3. Prepare the tharghet PC

1. Turn off the targhet pc (if on)
2. Connect the two USB sticks
3. Switch on the pc and enter into the bios
4. Select the first USB sitck as the boot device (at the end of the guide, could be necessary setting the Windows Boot Manager as the default boot option)

## 4. Guide inside the Windows installer

1. Press `Shift + F10` to open cmd
2. Write `diskpart` and press `enter` to open the partition tool
3. Inside `diskpart` write: `list vol` and press `enter` to visualize all memories units
4. Save (writing it in a piece of paper for example) the output for the next steps
5. Now exit to `diskpart` writing `exit` and pressing `enter`
6. Write `dism /capture-image /imagefile:<path where save the windows image (use the notes to understand the label of the second USB stick)>:\install.win /capturedir:<insert the label where windows is installed (ex. c)>:\ /scratchdir:<the same used for "imagefile>:\ /name:<write the name that you want for the image without spacing> /compress: maximum /checkintegrity /verify /bootable`
7. At the end of the process you can turn off the pc writing `wpeutil shutdown` and pressing `enter`
8. The system image will be in the second USB stick with the chosen name! 

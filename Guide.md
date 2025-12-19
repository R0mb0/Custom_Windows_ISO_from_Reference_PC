# Guide

## 1. Requirements

- Know how to access the bios settings of targhet pc
- Two USB stick (unless 16Gb)
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

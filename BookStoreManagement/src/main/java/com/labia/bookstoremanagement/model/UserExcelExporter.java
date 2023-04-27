/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.model;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author ADMIN
 */
public class UserExcelExporter {

    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<User> users;

    public UserExcelExporter(List<User> users) {
        this.users = users;
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Users");
    }

    private void writeHeaderRow() {
        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(14);
        style.setFont(font);

        Cell cell = row.createCell(0);
        cell.setCellValue("Username");
        cell.setCellStyle(style);

        cell = row.createCell(1);
        cell.setCellValue("Display Name");
        cell.setCellStyle(style);

        cell = row.createCell(2);
        cell.setCellValue("Email");
        cell.setCellStyle(style);

        cell = row.createCell(3);
        cell.setCellValue("Created Date");
        cell.setCellStyle(style);

        cell = row.createCell(4);
        cell.setCellValue("Dob");
        cell.setCellStyle(style);

        cell = row.createCell(5);
        cell.setCellValue("Roles");
        cell.setCellStyle(style);

    }

    private void writeDataRows() {
        int rowCount = 1;
        for (User user : users) {
            Row row = sheet.createRow(rowCount++);
            Cell cell = row.createCell(0);
            cell.setCellValue(user.getUsername());
            sheet.autoSizeColumn(0);

            cell = row.createCell(1);
            cell.setCellValue(user.getDisplayName());
            sheet.autoSizeColumn(1);

            cell = row.createCell(2);
            cell.setCellValue(user.getEmail());
            sheet.autoSizeColumn(2);

            cell = row.createCell(3);
            cell.setCellValue(new SimpleDateFormat("MM/dd/yyyy").format(user.getCreateDate()));
            sheet.autoSizeColumn(3);

            cell = row.createCell(4);
            cell.setCellValue(new SimpleDateFormat("MM/dd/yyyy").format(user.getDob()));
            sheet.autoSizeColumn(4);

            cell = row.createCell(5);
            cell.setCellValue(user.getRoles().toString());
            sheet.autoSizeColumn(5);

        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderRow();
        writeDataRows();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}

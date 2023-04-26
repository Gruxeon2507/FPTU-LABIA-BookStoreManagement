/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.labia.bookstoremanagement.utils;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author Asus
 */
public class DateTimeUtils {

    public static java.sql.Date getSqlDateNow() {
        LocalDate localDate = LocalDate.now();
        // Create a formatter for the desired format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy-MM-dd");

        // Format the LocalDate object to a String
        String formattedDate = localDate.format(formatter);

        // Parse the formatted date string to a Date object
        try {
            SimpleDateFormat sqlDateFormat = new SimpleDateFormat("yy-MM-dd");
            java.util.Date utilDate = sqlDateFormat.parse(formattedDate);
            return new java.sql.Date(utilDate.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }

        // Return null if the parsing fails
        return null;
    }

    public static Timestamp getSqlTimeStampNow() {
        LocalDateTime localDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = localDateTime.format(formatter);
        Timestamp timestamp = Timestamp.valueOf(formattedDateTime);
        return timestamp;
    }
}

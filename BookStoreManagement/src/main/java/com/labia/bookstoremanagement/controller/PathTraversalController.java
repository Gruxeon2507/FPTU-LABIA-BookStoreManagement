package com.labia.bookstoremanagement.controller;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/pathvul/")
public class PathTraversalController {
    @GetMapping (value = "img", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<?> getFile(@RequestParam("filename") String fileId, HttpServletRequest request) throws IOException {
        try{
            String filePath = "avatar/" + fileId + ".jpg";
            File file = new File(filePath);
            InputStream inputStream = new FileInputStream(file);
            InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileId);
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(inputStreamResource);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }
}

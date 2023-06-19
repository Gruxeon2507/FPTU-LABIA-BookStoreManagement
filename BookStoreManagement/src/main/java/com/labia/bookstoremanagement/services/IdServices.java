package com.labia.bookstoremanagement.services;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class IdServices {
    public UUID generateUuidFromString(String input) {
        byte[] bytes = input.getBytes(StandardCharsets.UTF_8);
        return UUID.nameUUIDFromBytes(bytes);
    }
    public UUID decodeStringToUuid(String uuidString) {
        return UUID.fromString(uuidString);
    }
}

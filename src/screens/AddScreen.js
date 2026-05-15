import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { theme, layout } from "../theme";

const emptyForm = {
  category: "Легковые автомобили",
  brand: "",
  model: "",
  year: "",
  mileage: "",
  bodyType: "",
  fuel: "",
  transmission: "",
  color: "",
  price: "",
  title: "",
  description: "",
  sellerName: "Aziz Auto",
  phone: "+998 90 123 45 67",
  location: "Ташкент",
  image: "",
};

const fieldGroups = [
  {
    title: "1. Категория",
    fields: [{ key: "category", label: "Раздел", placeholder: "Легковые автомобили" }],
  },
  {
    title: "2. Данные авто",
    fields: [
      { key: "brand", label: "Марка", placeholder: "Chevrolet" },
      { key: "model", label: "Модель", placeholder: "Cobalt" },
      { key: "year", label: "Год выпуска", placeholder: "2023", numeric: true },
      { key: "mileage", label: "Пробег", placeholder: "24 000", numeric: true },
      { key: "bodyType", label: "Кузов", placeholder: "Седан" },
      { key: "fuel", label: "Топливо", placeholder: "Бензин" },
      { key: "transmission", label: "Коробка передач", placeholder: "Автомат" },
      { key: "color", label: "Цвет", placeholder: "Белый" },
    ],
  },
  {
    title: "3. Цена и описание",
    fields: [
      { key: "price", label: "Цена", placeholder: "178 000 000 сум" },
      { key: "title", label: "Заголовок", placeholder: "Chevrolet Cobalt 2023, автомат" },
      { key: "description", label: "Описание", placeholder: "Опишите состояние, документы и торг", multiline: true },
    ],
  },
  {
    title: "4. Контакты",
    fields: [
      { key: "sellerName", label: "Имя продавца", placeholder: "Aziz" },
      { key: "phone", label: "Телефон", placeholder: "+998 90 123 45 67" },
      { key: "location", label: "Регион", placeholder: "Ташкент" },
      { key: "image", label: "Фото URL", placeholder: "https://..." },
    ],
  },
];

function parseNumber(value) {
  return Number(String(value || "").replace(/[^\d]/g, "")) || 0;
}

function buildSpecs(form) {
  return [
    { label: "Марка", value: form.brand },
    { label: "Модель", value: form.model },
    { label: "Год выпуска", value: form.year },
    { label: "Пробег", value: `${parseNumber(form.mileage).toLocaleString("ru-RU")} км` },
    { label: "Топливо", value: form.fuel },
    { label: "Коробка", value: form.transmission },
  ];
}

function formFromCar(car) {
  if (!car) {
    return emptyForm;
  }

  return {
    category: car.category || emptyForm.category,
    brand: car.brand || "",
    model: car.model || "",
    year: String(car.year || ""),
    mileage: String(car.mileage || ""),
    bodyType: car.bodyType || "",
    fuel: car.fuel || "",
    transmission: car.transmission || "",
    color: car.color || "",
    price: car.price || "",
    title: car.title || "",
    description: car.description || "",
    sellerName: car.sellerName || emptyForm.sellerName,
    phone: car.phone || emptyForm.phone,
    location: car.location || emptyForm.location,
    image: car.image || "",
  };
}

export default function AddScreen({
  editingCar,
  isSaving,
  statusMessage,
  onSubmit,
  onCancelEdit,
}) {
  const [form, setForm] = useState(emptyForm);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    setForm(formFromCar(editingCar));
    setValidationMessage("");
  }, [editingCar]);

  const updateField = (key, value) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  };

  const submitForm = () => {
    const requiredFields = ["brand", "model", "year", "price", "phone", "location"];
    const missingField = requiredFields.find((field) => !String(form[field]).trim());

    if (missingField) {
      setValidationMessage("Заполните марку, модель, год, цену, телефон и регион.");
      return;
    }

    const year = parseNumber(form.year);
    const mileage = parseNumber(form.mileage);
    const priceValue = parseNumber(form.price);
    const currency =
      form.price.toLowerCase().includes("у.е") ||
      form.price.toLowerCase().includes("usd") ||
      form.price.includes("$")
        ? "USD"
        : "UZS";

    const payload = {
      ...form,
      title:
        form.title.trim() ||
        `${form.brand} ${form.model} ${year}, ${form.transmission}`.trim(),
      year,
      mileage,
      priceValue,
      currency,
      condition: editingCar?.condition || "Б/у",
      owners: editingCar?.owners || "1 владелец",
      sellerType: editingCar?.sellerType || "Частное лицо",
      promoted: editingCar?.promoted || "",
      publishedAt: editingCar?.publishedAt || "Только что",
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
      specs: buildSpecs(form),
      isOwn: true,
    };

    onSubmit(payload);
  };

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      <Text style={styles.sectionTitle}>
        {editingCar ? "Редактировать объявление" : "Подать объявление"}
      </Text>
      <Text style={styles.caption}>
        Заполните данные автомобиля. После публикации объявление появится в
        каталоге и в разделе “Мои объявления”.
      </Text>

      <View style={styles.photoBox}>
        <Text style={styles.photoText}>Добавить фото автомобиля</Text>
        <Text style={styles.photoHint}>
          Вставьте URL фотографии ниже или оставьте поле пустым для демо-фото.
        </Text>
      </View>

      {fieldGroups.map((section) => (
        <View key={section.title} style={styles.formSection}>
          <Text style={styles.cardTitle}>{section.title}</Text>
          {section.fields.map((field) => (
            <View key={field.key} style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{field.label}</Text>
              <TextInput
                style={[styles.fieldInput, field.multiline && styles.textArea]}
                placeholder={field.placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType={field.numeric ? "numeric" : "default"}
                multiline={field.multiline}
                value={form[field.key]}
                onChangeText={(value) => updateField(field.key, value)}
              />
            </View>
          ))}
        </View>
      ))}

      {validationMessage ? (
        <Text style={styles.errorText}>{validationMessage}</Text>
      ) : null}
      {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}

      {editingCar ? (
        <Pressable style={styles.secondaryButton} onPress={onCancelEdit}>
          <Text style={styles.secondaryButtonText}>Отменить редактирование</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Сохранить черновик</Text>
        </Pressable>
      )}
      <Pressable
        style={[styles.primaryButton, isSaving && styles.buttonDisabled]}
        onPress={submitForm}
        disabled={isSaving}
      >
        <Text style={styles.primaryButtonText}>
          {isSaving
            ? "Сохраняем..."
            : editingCar
              ? "Сохранить изменения"
              : "Опубликовать"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: layout.padding,
    paddingBottom: 120,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sectionTitle.size,
    fontWeight: theme.typography.sectionTitle.weight,
    marginBottom: 8,
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.size,
    lineHeight: 22,
    marginBottom: layout.spacing,
  },
  photoBox: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
    borderRadius: layout.radius.card,
    padding: 22,
    alignItems: "center",
    marginBottom: layout.spacing,
    backgroundColor: theme.colors.secondaryBackground,
  },
  photoText: {
    color: theme.colors.primary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: "800",
    marginBottom: 6,
  },
  photoHint: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.caption.size,
    textAlign: "center",
  },
  formSection: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: layout.radius.card,
    padding: layout.padding,
    marginBottom: layout.spacing,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.cardTitle.size,
    fontWeight: theme.typography.cardTitle.weight,
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: layout.spacing,
  },
  inputLabel: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
    fontSize: theme.typography.caption.size,
  },
  fieldInput: {
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: layout.radius.input,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 16,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.body.size,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  statusText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.size,
    fontWeight: "700",
    marginBottom: layout.spacing,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.body.size,
    fontWeight: "700",
    marginBottom: layout.spacing,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: layout.radius.button,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  primaryButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.typography.body.size,
    fontWeight: "800",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: layout.radius.button,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.size,
    fontWeight: "800",
  },
});

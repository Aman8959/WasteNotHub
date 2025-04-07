import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { insertDonationSchema } from "@shared/schema";

const donationFormSchema = insertDonationSchema.extend({
  donor_name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  amount: z.number().min(1, {
    message: "Amount must be at least $1.",
  }),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonationForm = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donor_name: "",
      email: "",
      amount: 0,
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: DonationFormValues) => {
      const response = await apiRequest("POST", "/api/donations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Donation Successful",
        description: "Thank you for your generous donation!",
      });
      form.reset();
      setSelectedAmount(null);
    },
    onError: (error) => {
      toast({
        title: "Donation Failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your donation.",
        variant: "destructive",
      });
    },
  });

  const predefinedAmounts = [10, 25, 50, 100];

  const handleAmountSelection = (amount: number) => {
    setSelectedAmount(amount);
    form.setValue("amount", amount);
  };

  const onSubmit = (data: DonationFormValues) => {
    mutate(data);
  };

  return (
    <Card className="bg-neutral-50 p-6 md:p-8 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="donor_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-800">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-neutral-800">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel className="font-medium text-neutral-800">Donation Amount</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className={`border-primary ${
                    selectedAmount === amount
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleAmountSelection(amount)}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Custom Amount</FormLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
                      $
                    </span>
                    <FormControl>
                      <Input
                        className="pl-8"
                        placeholder="Custom amount"
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          setSelectedAmount(null); // Deselect buttons when custom amount is entered
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-neutral-800">Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share why you're supporting our cause"
                    rows={4}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="font-medium text-neutral-800">Payment Method</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button type="button" variant="outline" className="flex items-center justify-center">
                <i className="fab fa-cc-visa text-2xl mr-2"></i> Credit Card
              </Button>
              <Button type="button" variant="outline" className="flex items-center justify-center">
                <i className="fab fa-paypal text-2xl mr-2"></i> PayPal
              </Button>
              <Button type="button" variant="outline" className="flex items-center justify-center">
                <i className="fas fa-money-bill-wave text-2xl mr-2"></i> Bank Transfer
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-primary text-white font-heading font-medium text-lg rounded hover:bg-primary-dark"
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Donate Now"}
          </Button>

          <div className="mt-4 text-center text-sm text-neutral-600">
            <p>Your donation is tax-deductible. You will receive a confirmation receipt via email.</p>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default DonationForm;
